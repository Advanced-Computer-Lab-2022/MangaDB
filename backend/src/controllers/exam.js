const exam=require('../models/exam');

exports.createExam=async(examEntity)=>{
    let tempArray=[];
    for(let i=0;i<examEntity.length;i++){
        let temp={question:examEntity[i].question,
            solution:examEntity[i].solution.id,choices:examEntity[i].choices};
            tempArray.push(temp);
    }
    const myExam=new exam({exercises:tempArray,totalGrade:tempArray.length}); 
    await myExam.save();
    return myExam._id;


}
