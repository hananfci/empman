
## Quick Overview

```sh
 npm install - g @angular/cli10
 ng new empmanagment
cd empmanagment
ng serve 
```

```
empmanagment
├── README.md
├── node_modules
├── package.json
├── employee
│   ├── addemployee
│   ├── editempoloyee
│   └── employeelist
└── src
    ├── App
        ├──employee
            ├── addemployee
            ├── editempoloyee
            ├── employeelist
        ├──share
            ├── employee.model
            ├── employee.service
```

in this projedt I have used 
- npm install bootstrap.
- npm install jquery
- npm install --save @ng-bootstrap/ng-bootstrap.
- npm install ngx-bootstrap --save
- npm install ngx-pagination --save


### component employeelist
 in this component there are table  contain all list of employee with icons buttons and checjbox  with each td cell to  delete or edit each employee 
 also there is checkboxs in header table to select all employess once and press on button it's name delete in panel header to delete all employees once
 ther is also button add new employee to add new employee

### component addemployee
  in this component you csn edit specific employee info, there is form with some inputs to insert employee info , I have use reactive form 
### component editempoloyee
  in this component there is form with some inputs to insert employee info , I have use reactive form 

### share folder 
  contain employee.model and employee.service