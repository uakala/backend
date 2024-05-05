import CustomerService from "../../services/cusotmerService.js";

const customerService = new CustomerService();

async function handleCreateCustomer(req, res) {
    try {
        const customer = req.body;
        let result = await customerService.createCustomer(customer);
        res.json({message: 'Customer created successfully', customer: result});
    } catch (error) {
        console.error('Failed to create customer: ', error);
        res.status(500).json({error: error.message});
    }
}

export { handleCreateCustomer };
