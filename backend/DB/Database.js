import mongoose from "mongoose";


export const connectDB = ()=>{
    mongoose.connect("mongodb://localhost:27017/Expense-tracker" , {
        useNewUrlParser: true,
			useUnifiedTopology: true,
    })
    .then(() => console.log("DB CONNECTION SUCCESS"))
		.catch((err) => {

			console.log(`DB CONNECTION ISSUES`);
			console.error(err.message);
			process.exit(1);
		});
}
