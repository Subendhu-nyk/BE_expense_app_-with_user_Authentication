const Sequelize = require('../models/expense');

exports.postExpense=async (req, res) => {
    try {
      const name = req.body.name;
      const price = req.body.price;
      const date=  req.body.date;
      const category = req.body.category;
    
       
      const data = await Sequelize.create({
        Itemname: name,
        price: price,
        date:date,
        category: category,
       
      });        
      res.status(201).json({ newexpenseDetail: data });
    } catch (err) {       
    res.status(500).json({ error: err }) 
    }
  }

  exports.getExpense=async(req,res)=>{
    try{
    const expenses=await Sequelize.findAll();
    res.status(200).json({allExpenses:expenses});
    }catch(err){
        console.log('get user is failing', JSON.stringify(err))
        res.status(500).json({error:err })
    }
}


exports.deleteExpense=(req, res) => {
  const expenseid = req.params.expenseid;
  if(expenseid == undefined || expenseid.length === 0){
      return res.status(400).json({success: false, })
  }
  Expense.destroy({where: { id: expenseid, userId: req.user.id }}).then((noofrows) => {
      if(noofrows === 0){
          return res.status(404).json({success: false, message: 'Expense doenst belong to the user'})
      }
      return res.status(200).json({ success: true, message: "Deleted Successfuly"})
  }).catch(err => {
      console.log(err);
      return res.status(500).json({ success: true, message: "Failed"})
  })
}