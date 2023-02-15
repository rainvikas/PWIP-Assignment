const express = require('express');
const app = express()
app.get("/api", (req, res) => {
    console.log(req.headers.authentication)
    fetch("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f")
        .then((response) => response.json())
        .then((data) => {
            const newData = data.result.auditLog
            if (req.query.input == 'asc') {
                newData.sort(function (a, b) { return a.logId - b.logId })
            }
            const auditLog = newData.map(ele => {
                const data_time = ele.creationTimestamp
                const formatDate = data_time.split(' ').join('/')
                return {
                    log_id: ele.logId,
                    Application_type: ele.applicationType,
                    Application_id: ele.applicationId,
                    action: ele.actionType,
                    action_details: ele.actionType,
                    Date_time: formatDate
                }
            })
            res.send({ recordsFiltered: auditLog.length, auditLog })
        })
})
app.listen(3000)




