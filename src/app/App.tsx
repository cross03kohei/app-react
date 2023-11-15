import { Form } from "../components/Form";
import { Table } from "../components/Table";

function App() {
    return(
        <section className="bg0-white">
            <div className="container mt-8 px-6 py-12 mx-auto bg-transparent">
                <hr className="my-8 border-gray-200 dark:border-gray-700" />

                <div className="grid gap-6 grid-cols-2">
                    <Table />
                    <Form />
                </div>
            </div>
        </section>
    )
}

export default App;