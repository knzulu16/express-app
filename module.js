module.exports=function(){
  const index = function(req,res){
    res.send('subjects');
  };

  const add=function(req,res){
    res.send('Add a subject');
  }
  return{
    index,
    add
  }
}
