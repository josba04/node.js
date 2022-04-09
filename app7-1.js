//Express 기본 모듈 불러오기
var express = require('express');
var http = require('http');
var path = require('path');

//Express의 미들웨어 불러오기
var bodyParser = require('body-parser');
var static = require('serve-static');
const { emitWarning } = require('process');

//Express 객체 생성
var app = express();

//기본 속성 설정
app.set('port', process.env.PORT || 3000)

//body-parser를 이용해 application/x-222-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended : false}))

//body-parser를 이용해 application/json파싱
app.use(bodyParser.json())

app.use('/', static(path.join(__dirname, 'public'))) 

app.use(function(req, res, next){
    console.log('첫번째 미들웨어에서 요청을 처리함');  

    //login.html이 있는 경우
    res.redirect('./login.html');   //login.html
    //res.redirect('/login.html')
    //http://localhost:3000/login.html
});

//Express 서버에서 시작
http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
})