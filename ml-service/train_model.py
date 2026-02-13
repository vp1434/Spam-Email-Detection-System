from spam_detector import SpamDetector

if __name__ == "__main__":
    print("Training model...")
    detector = SpamDetector()
    detector.train_initial_model()
    print("Model training complete.")
