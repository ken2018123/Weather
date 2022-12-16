var url = "https://api.openweathermap.org/data/2.5/forecast?q=Fukuroi&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {//onreadystatechangeがあったら実行する
  if(xmlhttp.readyState==4){//もし4ならば正常にとれてるってやつ
    if(xmlhttp.status==200){//もし200って値が帰ってきたときはデータがとれてるってやつ
      var data=JSON.parse(xmlhttp.responseText);
      //responseTextで戻り値のテキストを取得して
      //JSON.parseでJSONのデータを連想配列に変化させる
      console.log(data);
      console.log(data["list"]["0"]["dt"]);
      console.log(data["list"]["1"]["dt"]);

      console.log(data["list"]["2"]["dt"]);
      console.log(data["list"]["0"]["main"]["pressure"]);
      console.log(data["list"]["1"]["main"]["pressure"]);
      console.log(data["list"]["0"]["weather"]["0"]["description"]);

      //ここの部分は何年何月何日OOの天気と書かれた見出し？の部分
      var date=new Date();
      date.setTime(data["list"]["0"]["dt"]*1000);
      console.log(data.city.name);
      document.getElementById("date01").innerHTML=date.getFullYear()+"年"+(1+date.getMonth())+"月"+date.getDate()+"日の"+data.city.name+"の天気";//date01の場所に内容を記述します

      var date2=new Date();
      date2.setTime(data["list"]["8"]["dt"]*1000);
      document.getElementById("date02").innerHTML=date2.getFullYear()+"年"+(1+date2.getMonth())+"月"+date2.getDate()+"日の"+data.city.name+"の天気";//date02の場所に内容を記述します

      var date3=new Date();
      date3.setTime(data["list"]["16"]["dt"]*1000);
      document.getElementById("date03").innerHTML=date3.getFullYear()+"年"+(1+date3.getMonth())+"月"+date3.getDate()+"日の"+data.city.name+"の天気";//date03の場所に内容を記述します

      var date4=new Date();
      date4.setTime(data["list"]["24"]["dt"]*1000);
      document.getElementById("date04").innerHTML=date4.getFullYear()+"年"+(1+date4.getMonth())+"月"+date4.getDate()+"日の"+data.city.name+"の天気";//date04の場所に内容を記述します

      var date5=new Date();
      date5.setTime(data["list"]["32"]["dt"]*1000);
      document.getElementById("date05").innerHTML=date5.getFullYear()+"年"+(1+date5.getMonth())+"月"+date5.getDate()+"日の"+data.city.name+"の天気";//date05の場所に内容を記述します



      //取得した時刻から順番にデータを格納していくので、経過してしまい、取得できてない部分をkeikazikanでずらして修正する
      keikazikan=(date.getHours())/3;
      zikoku=date.getHours();
      console.log(keikazikan);


      /*時刻記入*/
      //先に経過して取得できない可能性のある部分全部に経過の文字を記入しておく
      for(i=0;i<9;i++){
      document.getElementById("hour-"+i).innerHTML="経過";
      }
      //取得した時間を表示
      for(i=0;i<40;i++){
        var newdate=new Date();
        newdate.setTime(data["list"][i]["dt"]*1000);
        document.getElementById("hour-"+(keikazikan+i)).innerHTML=newdate.getHours()+"時";
    }

      /*天気記入*/
      //時間経過により取得できない可能性のある過去データの部分に、画像を挿入しておく
      for(i=0;i<9;i++){
      document.getElementById(("weather-"+(i))).src="img/pastdata3.png";
    }
      /*取得したアイコンを表示*/
      for(i=0;i<40;i++){
      document.getElementById(("weather-"+(keikazikan+i))).src="https://openweathermap.org/img/wn/"+data["list"][i]["weather"][0]["icon"]+"@2x.png";
    }

      /*気温記入*/
      for(i=0;i<9;i++){
        document.getElementById(("temp-"+i)).innerHTML="------";
      }
      for(i=0;i<40;i++){
        document.getElementById(("temp-"+(keikazikan+i))).innerHTML=data["list"][i]["main"]["temp"]+"°";
      }
      /*最高気温記入*/
      for(i=0;i<9;i++){
        document.getElementById(("high-"+i)).innerHTML="------";
      }

      for(i=0;i<40;i++){
        document.getElementById(("high-"+(keikazikan+i))).innerHTML=data["list"][i]["main"]["temp_max"]+"°";
        document.getElementById(("high-"+(keikazikan+i))).style.color="red";
      }


      /*最低気温記入*/
      for(i=0;i<9;i++){
        document.getElementById(("low-"+i)).innerHTML="------";
      }

      for(i=0;i<40;i++){
        document.getElementById(("low-"+(keikazikan+i))).innerHTML=data["list"][i]["main"]["temp_min"]+"°";
        document.getElementById(("low-"+(keikazikan+i))).style.color="blue";
      }


      /*熱中症記入*/
      //時間経過により取得できない可能性のある過去データの部分に、画像を挿入しておく
      for(i=0;i<9;i++){
      document.getElementById(("icon-"+(i))).src="img/pastdata3.png";
    }
    for(i=0;i<40;i++){
      a=data["list"][i]["main"]["temp"];//気温のデータ取得
      //気温が31°以上のとき
        if(a>=31){
        document.getElementById(("icon-"+(keikazikan+i))).src="img/icon0004.png";
        }
        //気温が28°以上のとき
        else if(a>=28){
          document.getElementById(("icon-"+(keikazikan+i))).src="img/icon0003.png";
        }
        //気温が24°以上のとき
        else if(a>=24){
          document.getElementById(("icon-"+(keikazikan+i))).src="img/icon0002.png";
        }
        //気温が24°未満のとき
        else{
          document.getElementById(("icon-"+(keikazikan+i))).src="img/icon0001.png";
        }
  }
    /*風向記入*/

    for(i=0;i<9;i++){
      document.getElementById(("deg-"+i)).innerHTML="------";
    }
    for(i=0;i<40;i++){
      deg=data["list"][i]["wind"]["deg"];
      r='北';
      if (deg>=11.25) r = '北北東';
      if (deg>=33.75) r = '北東';
      if (deg>=56.25) r = '東北東';
      if (deg>=78.75) r = '東';
      if (deg>=101.25) r = '東南東';
      if (deg>=123.75) r = '南東';
      if (deg>=146.25) r = '南南東';
      if (deg>=168.75) r = '南';
      if (deg>=191.25) r = '南南西';
      if (deg>=213.75) r = '南西';
      if (deg>=236.25) r = '西南西';
      if (deg>=258.75) r = '西';
      if (deg>=281.25) r = '西北西';
      if (deg>=303.75) r = '北西';
      if (deg>=326.25) r = '北北西';
      document.getElementById(("deg-"+(keikazikan+ i))).innerHTML=r;
    }


      /*風速記入*/

      for(i=0;i<9;i++){
        document.getElementById(("wind-"+i)).innerHTML="------";
      }


      for(i=0;i<40;i++){
        document.getElementById(("wind-"+(keikazikan+ i))).innerHTML=data["list"][i]["wind"]["speed"]+"(m/s)";
      }

      /*湿度アイコン記入*/
      //時間経過により取得できない可能性のある過去データの部分に、画像を挿入しておく
      for(i=0;i<9;i++){
      document.getElementById(("humidity-icon-"+(i))).src="img/pastdata4.png";
    }
    for(i=0;i<40;i++){
      a=data["list"][i]["main"]["humidity"];//湿度のデータ取得
      //湿度が90%以上のとき
        if(a>=90){
        document.getElementById(("humidity-icon-"+(keikazikan+i))).src="img/icon0010.png";
        }
        //湿度が80%以上のとき
        else if(a>=80){
          document.getElementById(("humidity-icon-"+(keikazikan+i))).src="img/icon0009.png";
        }
        //湿度が60%以上のとき
        else if(a>=60){
          document.getElementById(("humidity-icon-"+(keikazikan+i))).src="img/icon0008.png";
        }
        //湿度が40%以上のとき
        else if(a>=40){
          document.getElementById(("humidity-icon-"+(keikazikan+i))).src="img/icon0007.png";
        }
        //湿度が20%以上のとき
        else if(a>=20){
          document.getElementById(("humidity-icon-"+(keikazikan+i))).src="img/icon0006.png";
        }
        //気温が20%未満のとき
        else{
          document.getElementById(("icon-"+(keikazikan+i))).src="img/icon0005.png";
        }
  }


      /*湿度記入*/
      for(i=0;i<9;i++){
        document.getElementById(("humidity-"+i)).innerHTML="------";
      }

      for(i=0;i<40;i++){
        document.getElementById(("humidity-"+(keikazikan+ i))).innerHTML=data["list"][i]["main"]["humidity"]+"%";
      }
    }else{

    }
  }
};

xmlhttp.open("GET",url);//urlの情報を取得する
xmlhttp.send();//情報を送る





//↓ボタンを押すと地域変えたURLで再読み込みしてくれる！
window.onload=function(){
  document.getElementById("submit").onclick=function(){
    //submitボタンがクリックされたら...
      var inputname = document.getElementById("input").value;
      console.log(inputname);
      var url= "https://api.openweathermap.org/data/2.5/forecast?q="+inputname+"&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
      console.log(url);
      xmlhttp.open("GET",url);
      xmlhttp.send();


  };
  //北海道の範囲をクリックしたとき
  document.getElementById("hokkaido").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=hokkaido&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    console.log(url);
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };
  //青森の範囲をクリックしたとき
  document.getElementById("aomori").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=aomori&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };
  //秋田の範囲をクリックしたとき
  document.getElementById("akita").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=akita&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };
  //岩手の範囲をクリックしたとき
  document.getElementById("iwate").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=iwate&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };
  //山形の範囲をクリックしたとき
  document.getElementById("yamagata").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=yamagata&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //宮城の範囲をクリックしたとき
  document.getElementById("miyagi").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=miyagi&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //福島の範囲をクリックしたとき
  document.getElementById("fukushima").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=fukushima&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //茨城の範囲をクリックしたとき
  document.getElementById("ibaraki").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=ibaraki&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //千葉の範囲をクリックしたとき
  document.getElementById("chiba").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=chiba&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //栃木の範囲をクリックしたとき
  document.getElementById("tochigi").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=tochigi&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //群馬の範囲をクリックしたとき
  document.getElementById("gunma").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=gunma&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //埼玉の範囲をクリックしたとき
  document.getElementById("saitama").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=saitama&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //東京の範囲をクリックしたとき
  document.getElementById("tokyo").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=tokyo&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //神奈川の範囲をクリックしたとき
  document.getElementById("kanagawa").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=kanagawa&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //新潟の範囲をクリックしたとき
  document.getElementById("niigata").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=niigata&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //富山の範囲をクリックしたとき
  document.getElementById("toyama").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=toyama&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //石川の範囲をクリックしたとき
  document.getElementById("ishikawa").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=ishikawa&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //長野の範囲をクリックしたとき
  document.getElementById("nagano").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=nagano&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //山梨の範囲をクリックしたとき
  document.getElementById("yamanashi").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=yamanashi&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //静岡の範囲をクリックしたとき
  document.getElementById("shizuoka").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=shizuoka&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //愛知の範囲をクリックしたとき
  document.getElementById("aichi").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=aichi&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //岐阜の範囲をクリックしたとき
  document.getElementById("gifu").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=gifu&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //福井の範囲をクリックしたとき
  document.getElementById("fukui").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=fukui&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //滋賀の範囲をクリックしたとき
  document.getElementById("shiga").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=shiga&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //三重の範囲をクリックしたとき
  document.getElementById("mie").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=mie&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //京都の範囲をクリックしたとき
  document.getElementById("kyoto").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=kyoto&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //奈良の範囲をクリックしたとき
  document.getElementById("nara").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=nara&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //大阪の範囲をクリックしたとき
  document.getElementById("osaka").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=osaka&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //和歌山の範囲をクリックしたとき
  document.getElementById("wakayama").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=wakayama&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //兵庫の範囲をクリックしたとき
  document.getElementById("hyogo").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=hyogo&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //鳥取の範囲をクリックしたとき
  document.getElementById("tottori").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=tottori&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //岡山の範囲をクリックしたとき
  document.getElementById("okayama").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=okayama&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //島根の範囲をクリックしたとき
  document.getElementById("shimane").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=shimane&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //広島の範囲をクリックしたとき
  document.getElementById("hiroshima").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=hiroshima&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //山口の範囲をクリックしたとき
  document.getElementById("yamaguchi").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=yamaguchi&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //香川の範囲をクリックしたとき
  document.getElementById("kagawa").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=kagawa&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //徳島の範囲をクリックしたとき
  document.getElementById("tokushima").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=tokushima&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //愛媛の範囲をクリックしたとき
  document.getElementById("ehime").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=ehime&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };
  //高知の範囲をクリックしたとき
  document.getElementById("koti").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=koti&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };
  //大分の範囲をクリックしたとき
  document.getElementById("oita").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=oita&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //福岡の範囲をクリックしたとき
  document.getElementById("fukuoka").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=fukuoka&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //宮崎の範囲をクリックしたとき
  document.getElementById("miyazaki").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=miyazaki&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //熊本の範囲をクリックしたとき
  document.getElementById("kumamoto").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=kumamoto&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //鹿児島の範囲をクリックしたとき
  document.getElementById("kagoshima").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=kagoshima&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //佐賀の範囲をクリックしたとき
  document.getElementById("saga").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=saga&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //長崎の範囲をクリックしたとき
  document.getElementById("nagasaki").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=nagasaki&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };

  //沖縄の範囲をクリックしたとき
  document.getElementById("okinawa").onclick=function(){
    var url= "https://api.openweathermap.org/data/2.5/forecast?q=okinawa&appid=2ee32b3e3f7dccac20aa8e3d172165f5&units=metric&lang=ja";
    xmlhttp.open("GET",url);
    xmlhttp.send();
  };



};
