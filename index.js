const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const Expense = require("./models/chat.js"); // accessing chat.js
const Income = require("./models/chat2.js"); // accessing chat2.js
const { resolveSoa } = require("dns");

main()
  .then((res) => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/bank");
}

app.get("/expenditure", async (req, res) => {
  let details = await Expense.find();
  // console.log(details);
  res.render("home_exp.ejs", { details });
});

// new

app.get("/expenditure/new", (req, res) => {
  res.render("new_exp.ejs");
});

app.post("/expenditure", (req, res) => {
  let { name, amount, description } = req.body;
  let newExpense = new Expense({
    name: name,
    amount: amount,
    description: description,
  });
  newExpense
    .save()
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => {
      // console.log(err);
    });
  res.redirect("/expenditure");
});

// view in detail

app.get("/expenditure/view/:id", async (req, res) => {
  let { id } = req.params;
  let detail = await Expense.findById(id);
  // console.log(detail);
  res.render("view.ejs", { detail });
});

// edit

app.get("/expenditure/edit/:id", async (req, res) => {
  let { id } = req.params;
  let detail = await Expense.findById(id);
  res.render("edit.ejs", { detail });
});

app.put("/expenditure/edit/:id", async (req, res) => {
  let { id } = req.params;
  let { name, amount, description } = req.body;
  let updatedDetails = await Expense.findByIdAndUpdate(
    id,
    {
      name: name,
      amount: amount,
      description: description,
    },
    { runValidators: true, new: true }
  );
  // console.log(updatedDetails);
  res.redirect("/expenditure");
});

// delete

app.delete("/expenditure/delete/:id", async (req, res) => {
  let { id } = req.params;
  let deletedData = await Expense.findByIdAndDelete(id);
  // console.log(deletedData);
  res.redirect("/expenditure");
});

app.get("/", async (req, res) => {
  let incomeDetails = await Income.find();
  let expenditureDetails = await Expense.find();
  res.render("home.ejs", { incomeDetails, expenditureDetails });
});

//              --------------------------> INCOME INFORMATION <---------------------------------------------------

app.get("/income", async (req, res) => {
  let details = await Income.find();
  // amount in an array form
  // console.log(details);
  res.render("home_inc.ejs", { details });
});

// new income

app.get("/income/new", (req, res) => {
  res.render("new_inc.ejs");
});

app.post("/income", (req, res) => {
  let { amount } = req.body;
  let newAmount = new Income({
    amount: amount,
  });
  newAmount
    .save()
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => {
      // console.log(err);
    });
  res.redirect("/income");
});

// edit income
app.get("/income/edit/:id", async (req, res) => {
  let { id } = req.params;
  let detail = await Income.findById(id);
  res.render("edit_inc.ejs", { detail });
});

app.patch("/income/:id", async (req, res) => {
  let { id } = req.params;
  let { amount } = req.body;
  let updatedDetails = await Income.findByIdAndUpdate(
    id,
    {
      amount: amount,
    },
    { runValidators: true, new: true }
  );
  // console.log(updatedDetails);
  res.redirect("/income");
});

// delete income

app.delete("/income/:id", async (req, res) => {
  let { id } = req.params;
  let deletedData = await Income.findByIdAndDelete(id);
  // console.log(deletedData);
  res.redirect("/income");
});

app.listen(8080, () => {
  console.log("app is working");
});
