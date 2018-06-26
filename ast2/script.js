//random plotting
var scatter=function(){

var counter=0;
var count=parseInt(Math.random()*40);
var data =generateData(count,500);

data.forEach(function(points)
{
    plotdata(points);
});

function generateData(count, max)
{
    var point=[];
    for(var i=0; i<count; i++)
    {
        var top= parseInt(Math.random()*max);
        var left=parseInt(Math.random()*max);
        var points= {top:top,left:left};
        point.push(points);
    }
    return point;
}

function plotdata(point){
    var box=document.getElementById('box');
    box.style.width='700px';
    box.style.height='700px';
    box.style.background="orange";
    box.style.position="reative";
    box.style.overflow="hidden";

    var p=document.createElement('div');
    p.style.height='20px';
    p.style.width='20px';
    p.style.background="green";
    p.style.position='absolute';
    p.style.top=point.top+"px";
    p.style.left=point.left+"px";

    box.appendChild(p);

    p.onclick = function(){
        box.removeChild(p);
        counter++;
        if(counter===count)
        scatter();
    };

}
}
scatter();
