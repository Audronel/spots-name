# from cs50 import SQL
from flask import Flask, flash, jsonify,  flash, redirect, render_template, request, session, url_for
# pip install flask-mysqldb
# import secrets
from flask_mysqldb import MySQL
from tempfile import mkdtemp
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from functools import wraps
# import yaml
# from flask_session import Session
# from flask_sqlalchemy import SQLAlchemy
# import sqlite3



# Configure application
app = Flask(__name__)
app.config["SECRET_KEY"] = "OCML3BRawWEUeaxcuKHLpw"
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'map123'
app.config['MYSQL_DB'] = 'localspots'

app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

Session(app)
mysql = MySQL(app)
# session["sport"] =""
# Ensure templates are auto-reloaded

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/signin")
        return f(*args, **kwargs)
    return decorated_function 

def sport_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("sport") is None:
            return redirect("/home")
        return f(*args, **kwargs)
    return decorated_function 
      

@app.route("/")
@login_required
def index():
    return render_template("index.html")

# @app.route("/home", methods=["GET", "POST"])
# @login_required
# def home():
#     if request.method == "POST":
#         select = request.form.get('sports')
#         sport = str(select)
#         return redirect(url_for('places', sport=sport))
#     else:    
#         return render_template("home.html")

@app.route("/places", methods=["GET", "POST"])
@login_required
def places():
    sport = request.args.get('sport', None)
    print(sport)
    # select = request.form.get('sports')
    # sport = str(select)
    # session["sport"] = sport
    # print(session["sport"])
    # print( session["sport"])
    # print(session.get("sport"))
    # print(session.get("username"))
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM spots")
    mysql.connection.commit()
    rows = cur.fetchall()
    locations = [list(row) for row in rows]
    # print(session["sport"])
    cur.close()  
    return render_template("places.html", locations = locations)



@app.route("/signin", methods=["GET", "POST"])

def login():
    session.clear()
    if request.method == "POST":
        if not request.form.get("username"):
            return 'bad request!', 400
        elif not request.form.get("password"):
            return 'bad request!', 400
        cur = mysql.connection.cursor()
        username = request.form.get("username")
        cur.execute("SELECT * FROM user WHERE username = %s", [username])
        mysql.connection.commit()
        rows = cur.fetchall()
        cur.close()                 
        if len(rows) != 1 or not check_password_hash(rows[0][2], request.form.get("password")):
            return 'bad request!', 400
        session["user_id"] = rows[0][0]
        session["user_name"] = rows[0][1]
        return redirect("/places")
    else:
        return render_template("login.html")

@app.route("/signup", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        if not request.form.get("username"):
            flash("must provide username")
            return 'bad request!', 400
        elif not request.form.get("password"):
            flash("most provide password")
            return 'bad request!', 400
        elif not request.form.get("password1"):
            flash("You must confirm the password", 403)
            return 'bad request!', 400
        elif request.form.get("password1")!= request.form.get("password"):
            flash("Passwords does not match")
            return 'bad request!', 400
        username = request.form.get("username")
        password = generate_password_hash(request.form.get("password"))
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO user(username, password) VALUES(%s, %s)",(username, password))
        mysql.connection.commit()   
        cur.close()
        
        return redirect("/signin")
    else:
        return render_template("register.html")

@app.route("/add", methods=["GET", "POST"])
@login_required
def addplaces():
    # print(session["sport"])
    cur = mysql.connection.cursor()
    username = request.form.get("username")
    cur.execute("SELECT * FROM spots")
    mysql.connection.commit()
    rows = cur.fetchall()
    locations = [list(row) for row in rows]
    cur.close()  
    lat = request.args.get('lat')
    lng = request.args.get('lng')
    markerID = request.args.get('markerId')
    spotname = request.args.get('spotname')
    spotdescription = request.args.get('spotdescription')
    # user = session["user_name"]
    user = "Audrone"
    sportname = "Skateboarding"
    if markerID != None:
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO spots(lat, lng, marker_id, username, sportname, name, description) VALUES(%s, %s, %s, %s, %s, %s, %s)",(lat, lng, markerID, user, sportname, spotname, spotdescription))
        mysql.connection.commit()   
        cur.close
    return render_template("add.html", locations = locations)

@app.route("/logout")
@login_required
def logout():
    session.clear()
    return redirect("/signin")

 

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)