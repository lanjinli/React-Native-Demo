
开发环境

node v10.13.0
npm v6.4.1
react-native-cli v1.2.0
react-native v0.55.4


npm install react-native-linear-gradient --save
react-native link

安装react-native-linear-gradient出错
node_modules\react-native-linear-gradient\android\build.gradle
把依赖 compileOnly 改成 provided 即可

