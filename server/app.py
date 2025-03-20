import datetime
from flask import Flask, request, jsonify
from flask_graphql import GraphQLView
from flask_cors import CORS
import graphene

app = Flask(__name__)
CORS(app)

loans = [
    {
        "id": 1,
        "name": "Tom's Loan",
        "interest_rate": 5.0,
        "principal": 10000,
        "due_date": datetime.date(2025, 3, 1),
    },
    {
        "id": 2,
        "name": "Chris Wailaka",
        "interest_rate": 3.5,
        "principal": 500000,
        "due_date": datetime.date(2025, 3, 1),
    },
    {
        "id": 3,
        "name": "NP Mobile Money",
        "interest_rate": 4.5,
        "principal": 30000,
        "due_date": datetime.date(2025, 3, 1),
    },
    {
        "id": 4,
        "name": "Esther's Autoparts",
        "interest_rate": 1.5,
        "principal": 40000,
        "due_date": datetime.date(2025, 3, 1),
    },
]

loan_payments = [
    {"id": 1, "loan_id": 1, "payment_date": datetime.date(2025, 3, 4)},
    {"id": 2, "loan_id": 2, "payment_date": datetime.date(2025, 3, 15)},
    {"id": 3, "loan_id": 3, "payment_date": datetime.date(2025, 4, 5)},
]


def validate_loan_exists(loan_id):
    """
    Returns True if the loan with the given loan_id exists in the loans list,
    otherwise returns False.
    """
    for loan in loans:
        if loan["id"] == loan_id:
            return True

    return False


class ExistingLoans(graphene.ObjectType):
    id = graphene.Int()
    name = graphene.String()
    interest_rate = graphene.Float()
    principal = graphene.Int()
    due_date = graphene.Date()


class ExistingLoanPayments(graphene.ObjectType):
    id = graphene.Int()
    loan_id = graphene.Int()
    payment_date = graphene.Date()


class Query(graphene.ObjectType):
    loans = graphene.List(ExistingLoans)
    loan_payments = graphene.List(ExistingLoanPayments)

    def resolve_loans(self, info):
        return loans

    def resolve_loan_payments(self, info):
        return loan_payments


schema = graphene.Schema(query=Query)


app.add_url_rule(
    "/graphql", view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True)
)


@app.route("/")
def home():
    return "Welcome to the Loan Application API"


@app.route("/loans/<loan_id>/payments", methods=["POST"])
def add_loan_payment(loan_id):
    """
    Endpoint to add a new payment for a given loan.
    Expects a JSON payload with "payment_date".
    For example:
    { "payment_date": "2025-05-01" }
    """
    if not validate_loan_exists(int(loan_id)):
        return jsonify({"error": f"Loan with id {loan_id} does not exist"}), 404

    data = request.get_json()
    if not data or "payment_date" not in data:
        return jsonify({"error": "Missing 'payment_date' in request payload"}), 400

    try:
        payment_date = datetime.datetime.strptime(data["payment_date"], "%Y-%m-%d").date()
    except:
        return jsonify({"error": "Invalid date format. Expected YYYY-MM-DD."}), 400

    if loan_payments:
        new_id = max(payment["id"] for payment in loan_payments) + 1
    else:
        new_id = 1

    new_payment = {
        "id": new_id,
        "loan_id": int(loan_id),
        "payment_date": payment_date,
    }

    loan_payments.append(new_payment)

    return jsonify(new_payment), 201


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
