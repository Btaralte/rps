const express = require('express');
const app = express();
function win(p1,p2){
   if(p1=="Rock"){
       if(p2=="Scissor") return 1;
       else return 0;
   } 
   if(p1=="Scissor"){
       if(p2=="Paper") return 1;
       else return 0;
   }
   if(p1=="Paper"){
       if(p2=="Rock") return 1;
       else return 0;
   }
}
const ptn = {0:"Player 1",1:"Player 2",2:"Player 3",3:"Player 4"};
const rh = {1:"Rock",2:"Paper",3:"Scissor"};
app.get('/game/start',(req,res) => {
    let resp = [];
    let result = [['-',0,0,0],[0,'-',0,0],[0,0,'-',0],[0,0,0,'-']];
    for(let i=0;i<50;i++){
        let x = {};
        Object.values(ptn).forEach((p,index) => {
            x[p] = rh[Math.floor(Math.random()*3)+1];
        });
        console.log(x);
        for(let k=0;k<4;k++){
            for(let s=0;s<4;s++){
                if(k==s) continue;
                result[k][s]+=win(x[ptn[k]],x[ptn[s]]);
            }
        }
        let res2 = result.map((arr) => {
            return arr.slice();
        });
        resp[i] = [{...x},res2];
        console.log(result);

    }
    res.json(resp);
});
app.listen(3000,()=>{
    console.log("App listening on port 3000");
})

