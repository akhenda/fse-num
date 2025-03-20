# TODO/Approach

1. **Setup**: All the resources you require to do this assessment will be provided along with this README.

   - [x] Check and update docker
   - [x] Setup and run the server
     - [x] `docker compose up --build`
     - [x] Fix the loans query
   - [x] Setup the web app
     - [x] Install deps and run it
   - [ ] Some best practises
     - [ ] Quickly set up the repo with `commitlint` & `cz-git` and ai commits
     - [ ] Setup ts path aliases for the web app
     - [ ] Make the ts paths work with vite
     - [x] Properly setup linting with prettier and eslint
       - [x] Add prettier to dev deps
         - [x] Add prettierrc file
       - [ ] Add a few eslint plugins for better DX
         - [x] eslint-config-prettier
         - [x] eslint-plugin-prettier
         - [x] eslint-plugin-react
         - [x] eslint-plugin-import
         - [x] eslint-plugin-simple-import-sort
         - [x] eslint-plugin-sonarjs
         - [ ] eslint-plugin-testing-library
         - [x] eslint-plugin-unused-imports
     - [x] Add `.vscode` settings for auto formatting

2. **GraphQL Data Refactor & Fetching**:

   - [x] Update GraphQL Schema to expose loan_payments
     - (Note the GraphIQL tool can be useful for debugging by visiting localhost:2024/grqphql in your browser)
   - [x] Consume the updated graphql schema from the web app

3. **Web App Fetch & Render**:

   - [x] Update the web app to consume the loan and loanPayment data from the server
   - [x] Note that `npm run compile` will update the generated typescript types within the `__generated__` folder.
     - [x] Watch GraphQL changes
   - [ ] Display this data together using well-designed components & conditional styling
     - [ ] Setup tailwind & shadcn for styling

4. **Problem Solving**:

   - Problem Statement:
     - A borrower repays a loan in monthly installments. Each installment falls into one of three categories:
       - `"On Time"` → If the payment is made within 5 days of the due date. (GREEN)
       - `"Late"` → If the payment is made between 6 and 30 days after the due date. (ORANGE)
       - `"Defaulted"` → If the payment is more than 30 days late. (RED)
       - `"Unpaid"` is included for cases where there is no payment date. (GREY)
   - Task:
     - Write a function that categorizes loan payments and returns a new list/array where each payment including existing loan information is combined & categorized as "On Time", "Late", "Defaulted" or "Unpaid".
     - You should not use any external libraries.
     - NOTE: When displaying these on the UI - use the colors next to each status as a visual indication.

   **Expected Output**:

   ```tsx
   [
     {
       id: 1,
       name: "Tom's Loan",
       interest_rate: 5.0,
       principal: 10000,
       dueDate: '2025-03-01',
       paymentDate: '2025-03-04',
       status: 'On Time',
     },
     {
       id: 2,
       name: 'Chris Wailaka',
       interest_rate: 3.5,
       principal: 500000,
       dueDate: '2025-03-01',
       dueDate: '2025-03-01',
       paymentDate: '2025-03-15',
       status: 'Late',
     },
     {
       id: 3,
       name: 'NP Mobile Money',
       interest_rate: 4.5,
       principal: 30000,
       dueDate: '2025-03-01',
       dueDate: '2025-03-01',
       paymentDate: '2025-04-05',
       status: 'Defaulted',
     },
     {
       id: 4,
       name: "Esther's Autoparts",
       interest_rate: 1.5,
       principal: 40000,
       dueDate: '2025-03-01',
       dueDate: '2025-03-01',
       paymentDate: null,
       status: 'Unpaid',
     },
   ];
   ```

5. **Debugging & Code Refactoring**:

   - Based on this project, demonstrate your ability in refactoring this component `LoanCalculator.tsx`.

6. **Bonus**:

   - [x] Build a REST Endpoint on the server that adds payments to the payments list. Use this endpoint in the web application's AddPayment component to make the call.
   - [x] Implement a loading spinner or some form of feedback while data is being fetched or the form is being submitted.
   - [ ] Add error handling for both the GraphQL query and the REST API call.
   - [ ] Any form of tests (unit/functional)
   - [ ] Note down additional suggestions, given more time
   - [x] Recording of your project

7. **Submission**:

   - [ ] Ensure your code is well-documented and formatted.
   - [ ] Push your code to your GitHub repository.
   - [ ] Provide a link to your repository and a brief description of your approach.

8. **Follow-Up Questions**:
   - Be prepared to explain your code, discuss your approach, and suggest improvements during a follow-up session.
   - You may be asked to extend the functionality of your application during the follow-up.
