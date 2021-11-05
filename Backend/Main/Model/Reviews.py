from  Main.DAC.config import db

class Reviews(db.Document):
    className = db.StringField(required=True)
    review =  db.StringField(required=True)
    professor =  db.StringField(required=True)
    date =  db.StringField(required=True)
    likes =  db.StringField(required=True)
    dislikes =  db.StringField(required=True)