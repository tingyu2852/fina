export const money=(v, len, split)=> {
    (split = split || ","), (len = Math.abs(+len % 20 || 2));
    v = parseFloat((v + "").replace(/[^\d\.-]/g, "")).toFixed(len) + "";
    return v.replace(/\d+/, function (v) {
      let lit = v.length % 3 == 0;
      let index = lit ? v.length - 3 : -1;
      return '￥'+v
        .split("")
        .reverse()
        .join("")
        .replace(/\d{3}/g, function (k, l) {
          return k + (l == index && lit ? "" : split);
        })
        .split("")
        .reverse()
        .join("");
    });
  }

  export const formatInput=(number)=> {
    // 限制只允许输入数字和小数点
    number = number.toString()
    number = number.replace(/[^\d.]/g, "");

    // 格式化数字为带逗号的字符串
    if (number.includes(".")) {
      const parts = number.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      parts[1] = parts[1].slice(0, 2); // 限制小数位数最多为两位
      
      number =  parts.join(".");
    } else {
      number = number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    if(number.length>0){
      number='￥'+number
    }
    return number;
  }