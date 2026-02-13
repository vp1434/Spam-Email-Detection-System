import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import joblib
import os

class SpamDetector:
    def __init__(self):
        self.model = None
        if os.path.exists('spam_model.pkl'):
            self.model = joblib.load('spam_model.pkl')
        else:
            self.train_initial_model()

    def train_initial_model(self):
        # Expanded training data (Balanced)
        raw_data = [
            ('Free money now!!!', 1), ('Hi, how are you?', 0), 
            ('Win a lottery prize', 1), ('Meeting at 3pm', 0), 
            ('Click here to claim your reward', 1), ('Can we catch up later?', 0),
            ('Limited time offer! Buy now!', 1), ('Project deadline is tomorrow', 0),
            ('Congratulations! You won $1000', 1), ('Lets grab lunch', 0),
            ('URGENT: Your account is compromised', 1), ('Happy Birthday!', 0),
            ('Get rich quick schemes', 1), ('Reminder: Doctor appointment', 0),
            ('Exclusive deal just for you', 1), ('See you at the party', 0),
            ('You have been selected for a prize', 1), ('Can you send me the file?', 0),
            ('Earn $5000 from home', 1), ('Where are you?', 0),
            ('Claim your free gift', 1), ('Call me back', 0),
            ('100% free', 1), ('Are you coming?', 0),
            ('Lowest price guaranteed', 1), ('Good morning', 0),
            ('Cash bonus waiting', 1), ('Project update', 0),
            ('Double your income', 1), ('How was your weekend?', 0),
            ('Investment opportunity', 1), ('Please review the document', 0),
            ('Credit card offer', 1), ('Thanks for your help', 0),
            ('Loan approved', 1), ('Lets meet effectively', 0),
            ('Act now!', 1), ('Hope you are well', 0),
            ('Winner announced', 1), ('Sent from my iPhone', 0),
            ('Nigerian prince needs help', 1), ('Dinner tonight?', 0),
            ('Verify your account', 1), ('Attachment included', 0),
            ('Unsubscribe here', 1), ('Great job on the presentation', 0),
            ('Cheap meds', 1), ('Take care', 0),
            ('Hot singles in your area', 1), ('Love you', 0),
            ('Casino bonus', 1), ('Meeting minutes', 0),
            ('Work form home', 1), ('Flight details', 0),
            ('Crypto investment', 1), ('Agenda for next week', 0),
            ('Rolex watches cheap', 1), ('Did you get my email?', 0),
            ('Lose weight fast', 1), ('Family gathering', 0),
            ('Make money online', 1), ('Check this out', 0),
            ('Your package is waiting', 1), ('Thinking of you', 0),
            ('Final notice', 1), ('Delivery confirmation', 0),
            ('Suspicious activity detected', 1), ('Invoice attached', 0),
            ('Reset your password', 1), ('Your subscription is expiring', 0),
            ('Gift card inside', 1), ('Update your payment method', 0),
            ('Flash sale', 1), ('Special promotion', 0),
            ('Save big', 1), ('Clearance sale', 0),
            ('Apply now', 1), ('Dont miss out', 0),
            ('Partnership opportunity', 1), ('Job offer', 0),
            ('Marketing strategy', 1), ('Business proposal', 0)
        ]

        df = pd.DataFrame(raw_data, columns=['text', 'label'])
        
        # Ensure balanced or somewhat sufficient data
        # Using TfidfVectorizer with stop words and lowercasing (default)
        self.model = make_pipeline(TfidfVectorizer(stop_words='english', max_features=1000), MultinomialNB())
        self.model.fit(df['text'], df['label'])
        joblib.dump(self.model, 'spam_model.pkl')
        print("Initial model trained and saved with expanded dataset.")

    def predict(self, text):
        if not self.model:
            self.train_initial_model()
        
        prediction = self.model.predict([text])[0]
        probabilities = self.model.predict_proba([text])[0]
        
        # probability of class 1 (Spam)
        confidence = probabilities[1] if prediction == 1 else probabilities[0]
        
        return {
            'is_spam': bool(prediction == 1),
            'confidence': float(confidence)
        }
