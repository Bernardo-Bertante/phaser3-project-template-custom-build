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
        else:
            output = f"{output}"

    except Exception as e:
        output = f"Erro ao executar o código: {str(e)}"
        print(f"Erro ao executar o código: {str(e)}")  

    finally:
        sys.stdout = old_stdout


    print(f"Resposta final: {output}")
    return jsonify({'output': output})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)