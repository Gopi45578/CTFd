from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/setup', methods=['GET', 'POST'])
def setup():
    if request.method == 'POST':
        data = request.json
        return jsonify({"message": "Setup data received", "data": data})
    return render_template('setup.html')  

@app.route('/scoreboard', methods=['GET', 'POST'])
def scoreboard():
    if request.method == 'POST':
        data = request.json
        return jsonify({"message": "Score data received", "data": data})
    return jsonify({"message": "Scoreboard endpoint active"})

if __name__ == '__main__':
    app.run(debug=True)
