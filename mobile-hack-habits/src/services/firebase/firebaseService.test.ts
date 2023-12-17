import {
  create,
  get,
  getById,
  update,
  deleteById,
} from './firebaseService';

// Mocking the firestore functions
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  Timestamp: {
    now: jest.fn(),
  },
  query: jest.fn(),
  orderBy: jest.fn(),
  updateDoc: jest.fn(),
  doc: jest.fn(),
  deleteDoc: jest.fn(),
  getDoc: jest.fn(),
}));

// Mocking the firestore database instance
jest.mock('./firebaseConfig', () => ({
  db: {},
}));

describe('Firebase Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a document successfully', async () => {
      // Arrange
      const payload = { 
        created: new Object()
      };
      const collectionName = 'yourCollection';
      const response = { id: '123' };
      (jest.requireMock('firebase/firestore').addDoc as jest.Mock).mockResolvedValue(response);

      // Act
      const result = await create({ collectionName, payload });

      // Assert
      expect(result).toBeTruthy();
      expect(jest.requireMock('firebase/firestore').addDoc).toHaveBeenCalled();
    });

    it('should throw an error if document creation fails', async () => {
      // Arrange
      const payload = {};
      const collectionName = 'yourCollection';
      const errorMessage = 'Failed to create document';
      (jest.requireMock('firebase/firestore').addDoc as jest.Mock).mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(create({ collectionName, payload })).rejects.toThrow(errorMessage);
    });
  });

  describe('get', () => {
    it('should get documents successfully', async () => {
      // Arrange
      const collectionName = 'yourCollection';
      const response = {}; // Mock your response here
      (jest.requireMock('firebase/firestore').query as jest.Mock).mockReturnValue(response);

      // Act
      const result = await get({ collectionName });

      // Assert
      expect(result).toEqual(response);
      expect(jest.requireMock('firebase/firestore').query).toHaveBeenCalled();
    });

    it('should throw an error if getting documents fails', async () => {
      // Arrange
      const collectionName = 'yourCollection';
      const errorMessage = 'Failed to get documents';
      (jest.requireMock('firebase/firestore').query as jest.Mock).mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(get({ collectionName })).rejects.toThrow(errorMessage);
    });
  });

  describe('getById', () => {
    it('should get a document by ID successfully', async () => {
      // Arrange
      const collectionName = 'yourCollection';
      const id = '123';
      const response = { id: '123', data: () => ({})}; // Mock your response here
      (jest.requireMock('firebase/firestore').getDoc as jest.Mock).mockResolvedValue(response);

      // Act
      const result = await getById({ collectionName, id });

      // Assert
      expect(result).not.toBeNull();
      expect(jest.requireMock('firebase/firestore').getDoc).toHaveBeenCalled();
    });

    it('should throw an error if getting a document by ID fails', async () => {
      // Arrange
      const collectionName = 'yourCollection';
      const id = '123';
      const errorMessage = 'Failed to get document by ID';
      (jest.requireMock('firebase/firestore').getDoc as jest.Mock).mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(getById({ collectionName, id })).rejects.toThrow(errorMessage);
    });
  });

  describe('update', () => {
    it('should update a document successfully', async () => {
      // Arrange
      const collectionName = 'yourCollection';
      const id = '123';
      const payload = {}; // Mock your payload here
      const response = { id: '123', success: true, date: {} }; // Mock your response here
      (jest.requireMock('firebase/firestore').updateDoc as jest.Mock).mockResolvedValue(response);

      // Act
      const result = await update({ collectionName, id, payload });

      // Assert
      expect(result).not.toBeNull();
      expect(jest.requireMock('firebase/firestore').updateDoc).toHaveBeenCalled();
    });

    it('should throw an error if updating a document fails', async () => {
      // Arrange
      const collectionName = 'yourCollection';
      const id = '123';
      const payload = {}; // Mock your payload here
      const errorMessage = 'Failed to update document';
      (jest.requireMock('firebase/firestore').updateDoc as jest.Mock).mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(update({ collectionName, id, payload })).rejects.toThrow(errorMessage);
    });
  });

  describe('deleteById', () => {
    it('should delete a document by ID successfully', async () => {
      // Arrange
      const collectionName = 'yourCollection';
      const id = '123';
      const response = { id: '123', success: true, date: {} }; // Mock your response here
      (jest.requireMock('firebase/firestore').deleteDoc as jest.Mock).mockResolvedValue(response);

      // Act
      const result = await deleteById({ collectionName, id });

      // Assert
      expect(result).not.toBeNull();
      expect(jest.requireMock('firebase/firestore').deleteDoc).toHaveBeenCalled();
    });

    it('should throw an error if deleting a document by ID fails', async () => {
      // Arrange
      const collectionName = 'yourCollection';
      const id = '123';
      const errorMessage = 'Failed to delete document by ID';
      (jest.requireMock('firebase/firestore').deleteDoc as jest.Mock).mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(deleteById({ collectionName, id })).rejects.toThrow(errorMessage);
    });
  });
});
