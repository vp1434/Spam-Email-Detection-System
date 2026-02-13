try:
    import flask
    print("Flask installed")
except ImportError:
    print("Flask NOT installed")

try:
    import flask_cors
    print("Flask-CORS installed")
except ImportError:
    print("Flask-CORS NOT installed")

try:
    import sklearn
    print("Scikit-learn installed")
except ImportError:
    print("Scikit-learn NOT installed")

try:
    import pandas
    print("Pandas installed")
except ImportError:
    print("Pandas NOT installed")

try:
    import joblib
    print("Joblib installed")
except ImportError:
    print("Joblib NOT installed")
