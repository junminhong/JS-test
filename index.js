const factories = [
    { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
    { name: "BR2", employees: ["Jessie", "Karen", "John"] },
    { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
    { name: "BR4", employees: [] }
  ];

const employeeType = [
    {id: 1, "name": "FullTime", work_begin: "09:00:00", work_end: "17:00:00"},
    {id: 2, "name": "MidTime", work_begin: "12:00:00", work_end: "21:00:00"},
    {id: 3, "name": "HalfTime", work_begin: "20:00:00", work_end: "00:00:00"},
];

const employees = [
      {id: 1, name: "Alice", type: 2},
      {id: 2, name: "Bob", type: 3},
      {id: 3, name: "John", type: 2},
      {id: 4, name: "Karen", type: 1},
      {id: 5, name: "Miles", type: 3},
      {id: 6, name: "Henry", type: 1}
];

const tasks = [
    {id: 1, title: "task01", duration: 60 },
    {id: 2, title: "task02", duration: 120},
    {id: 3, title: "task03", duration: 180},
    {id: 4, title: "task04", duration: 360},
    {id: 5, title: "task05", duration: 30},
    {id: 6, title: "task06", duration: 220},
    {id: 7, title: "task07", duration: 640},
    {id: 8, title: "task08", duration: 250},
    {id: 9, title: "task09", duration: 119},
    {id: 10, title: "task10", duration: 560},
    {id: 11, title: "task11", duration: 340},
    {id: 12, title: "task12", duration: 45},
    {id: 13, title: "task13", duration: 86},
    {id: 14, title: "task14", duration: 480},
    {id: 15, title: "task15", duration: 900}
];

function countEmployeesByFactory() {
    return factories.map(function(factory) {
         return {name: factory.name, count: factory.employees.length};
    });
}

function summaryEmployeeCount(){
    let employeeCountMap = new Map();
    factories.forEach(function(factory) {  
        if (factory.employees.length === 0) return;
        factory.employees.forEach(function(employee) {
            if (!employeeCountMap.has(employee))
                employeeCountMap.set(employee, 1);
            else
                employeeCountMap.set(employee, employeeCountMap.get(employee) + 1);
        })
    })
    return employeeCountMap;
}

function employeeCountMapToAry(employeeCountMap){
    let employeeCountAry = [];
    for (let [key, value] of employeeCountMap) {
        employeeCountAry.push({employee: key, count: value});
    }
    return employeeCountAry;
}

function countEmployeesByName(){
    return employeeCountMapToAry(summaryEmployeeCount());
}

function sortEmployeeNameByFactories(){
    return factories.map(function(factory) {
        return {name: factory.name, employees: factory.employees.sort()};
    });
}

function getTimeAry(time){
    let regExTime = /(^(?:2[0-3]|[01][0-9])):([0-5][0-9]):([0-5][0-9])$/;
    let regExTimeArr = regExTime.exec(time);
    return {hour: regExTimeArr[1], min: regExTimeArr[2], second: regExTimeArr[3]};
}

function countTotalSecond(time){
    return parseInt(time.hour) * 60 * 60 + parseInt(time.min) * 60 + parseInt(time.second);
}

function summaryEmployeeTypeTotalTime(){
    let totalSecondMap = new Map();
    employeeType.forEach(function(type){
        beginTime = getTimeAry(type.work_begin);
        endTime = getTimeAry(type.work_end);
        if (beginTime.hour === "00")
            beginTime.hour = "24";
        if (endTime.hour === "00")
            endTime.hour = "24";
        let beginTotalSecond = countTotalSecond(beginTime);
        let endTotalSecond =  countTotalSecond(endTime);
        totalSecondMap.set(type.id, endTotalSecond - beginTotalSecond);
    })
    return totalSecondMap;
}

function countWorkedTotalHours(){
    let totalSecondMap = summaryEmployeeTypeTotalTime();
    let totalSecondTime = 0;
    employees.forEach(function(employee){
        totalSecondTime += totalSecondMap.get(employee.type);
    })
    return totalSecondTime / 3600;
}

function getTypeId(dayTime){
    let typeId = 0;
    employeeType.forEach(function(type){
    	if (type.name === dayTime) typeId = type.id;
  	})
    return typeId;
}

function countWorkEmployeesByDayTime(typeId){
    let workEmployeeAmount = 0;
    employees.forEach(function(employee){
    	if (employee.type === typeId) workEmployeeAmount += 1;
  	})
    return workEmployeeAmount
}

function howManyEmployeeByTime(dayTime){
    return countWorkEmployeesByDayTime(getTypeId(dayTime));
}

function howManyNeededWorkDay(){
    let totalMinTime = 0;
    let beginTotalSecond =  countTotalSecond({hour: "09", min: "00", second: "00"});
    let endTotalSecond =  countTotalSecond({hour: "24", min: "00", second: "00"});
    let totalWorkSecond = endTotalSecond - beginTotalSecond;
    tasks.forEach(function(task){
        totalMinTime += task.duration;
    })
    return totalMinTime * 60 / totalWorkSecond;
}

/*
1. countEmployeesByFactory()
2. countEmployeesByName()
3. sortEmployeeNameByFactories()
4. countWorkedTotalHours()
5. howManyEmployeeByTime(dayTime)
6. howManyNeededWorkDay()
*/