const date = require("./date");
const _ = require("lodash");
const { Item, List } = require("../models");

const day = date.getDay();

// Original task items
const item1 = new Item({
  task: "Welcome to your todolist",
});
const item2 = new Item({
  task: "Hit the + button to add a new item",
});
const item3 = new Item({
  task: "Hit this to delete an item --->",
});
const item4 = new Item({
  task: "Tap the task name to go back to all your tasks",
});

const defaultItems = [item1, item2, item3, item4];

// @desc GET router.route("/")
exports.getLists = (req, res) => {
  List.find({}, (err, lists) => {
    if (err) return console.log(err.message);
    res.render("home", { listTitle: day, lists });
  });
};

// @desc POST router.route("/")
exports.add = (req, res) => {
  const itemName = req.body.newItem;
  const listTitle = req.body.list;
  if (itemName !== "") {
    const item = new Item({
      task: itemName,
    });
    if (listTitle === day) {
      res.redirect(`/${itemName}`);
    } else {
      List.findOne({ name: listTitle }, (err, foundList) => {
        if (err) return console.log(err.message);
        foundList.items.push(item);
        foundList.save((err) => {
          if (err) return console.log(err.message);
          res.redirect(`/${listTitle}`);
        });
      });
    }
  } else if (listTitle === day) {
    res.redirect("/");
  } else {
    res.redirect(`/${listTitle}`);
  }
};

// @desc GET router.route("/about")
exports.getAbout = (req, res) => {
  res.render("about");
};

// @desc GET router.route("/:customListName")
exports.getListItems = (req, res) => {
  const customListName = _.startCase(req.params.customListName);
  List.findOne({ name: customListName }, (err, foundList) => {
    if (err) return console.log(err.message);
    if (foundList) {
      res.render("list", {
        listTitle: foundList.name,
        newListItems: foundList.items,
      });
    } else {
      const list = new List({
        name: customListName,
        items: defaultItems,
      });
      list.save((err) => {
        if (err) return console.log(err.message);
        res.redirect(`/${customListName}`);
      });
    }
  });
};

// @desc POST router.route("/delete") DELETE
exports.del = (req, res) => {
  const id = req.body.delete; //input type = "submit" name = "delete"
  const listTitle = req.body.list;
  if (listTitle === day) {
    List.findByIdAndDelete(id, (err) => {
      if (err) return console.log(err.message);
      res.redirect("/");
    });
  } else {
    List.findOneAndUpdate(
      { name: listTitle },
      { $pull: { items: { _id: id } } },
      (err) => {
        if (err) return console.log(err.message);
        res.redirect(`/${listTitle}`);
      }
    );
  }
};
