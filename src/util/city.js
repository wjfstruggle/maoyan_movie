// import http from 'http.js'
// import API from '@/api/index'
export function getCityList(){
    return new Promise((resolve, reject)=>{
        http({
            url: API.CITY_LIST_API,
            method: 'GET'
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }else{
                //请求成功
                let cityMap = {};
                data.cts.map((item)=>{
                    // 取得首字母
                    let letter = item.py[0];
                    //按首字母分类
                    if(!cityMap[letter]){
                        cityMap[letter] = [];
                    }
                    cityMap[letter].push(item);
                })
                //排序
                let keys = Object.keys(cityMap);
                // 选择排序,升序
                for(let i = 0; i < keys.length; i++){
                    for(let j = i+1; j < keys.length; j++){
                        if(keys[i] > keys[j]){
                            let tmp = keys[i];
                            keys[i] = keys[j];
                            keys[j] = tmp;
                        }
                    }
                }
                //组装数据
                let newData = keys.map(letter=>{
                    return {
                        key: letter,
                        value: cityMap[letter]
                    }
                })
                resolve({
                    keys,
                    data: newData
                });
            }
        })
        .catch(error=>{
            //请求失败
        })
    })
}
