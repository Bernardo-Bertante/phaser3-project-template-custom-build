import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import io

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 

@app.route('/execute', methods=['POST'])
def execute_code():
    data = request.get_json()
    code = data.get('code', '')
    print(f"Código recebido: {code}")

    old_stdout = sys.stdout
    sys.stdout = io.StringIO()

    try:
        exec(code)
        output = sys.stdout.getvalue().strip()
        print(f"Saída gerada: {output}")
        if not output:
            output = 'Nenhuma saída gerada.'
    except Exception as e:
        output = f"Erro ao executar o código: {str(e)}"
        print(output)
    finally:
        sys.stdout = old_stdout

    return jsonify({'output': output})

import os
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Servidor rodando no IP específico com HTTPS!"

if __name__ == '__main__':
    
    base_dir = os.path.dirname(os.path.abspath(__file__))

    cert_file = os.path.join(base_dir, "192.168.100.88+1.pem")
    key_file = os.path.join(base_dir, "192.168.100.88+1-key.pem")

    app.run(debug=True, host='127.0.0.1', port=5001, ssl_context=(cert_file, key_file))

