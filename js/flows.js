var flows = {
  "group":{
    "datacollect":{
      "nodes":[{
        "name": "FirstSteps",
        "header":"First Steps",
        "subheader":"Select the type of issue to work from the choices below",
        "blocks":[2,0,0,0,0,0],
        "infoText":[],
        "options": [
          {
            "title":"Inbound Call/Chat",
            "id":"IBC",
            "name":"callType",
            "value":"IBC",
            "suboptions":[
              {"title":"name"}
            ]
          },
          {
            "title":"Get the Next Task",
            "id":"GNT",
            "name":"callType",
            "value":"GNT",
            "suboptions":[]
          },
          {
            "title":"Work a Specific Task Assigned by a Manager or Team Lead",
            "id":"ITP",
            "name":"callType",
            "value":"ITP",
            "suboptions":[]
          }
        ],
        "choices":[
          {
            "title":"choice",
            "id":"default",
            "name":"default",
            "value":"default"
          }
        ]
      }]
    }
  }
}

var flowData = JSON.stringify(flows);
