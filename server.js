const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// 首页路由
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 日期处理 API 路由
app.get('/api/:date?', (req, res) => {
    let date;

    // 检查是否提供了日期参数
    if (!req.params.date) {
        date = new Date();
    } else {
        // 尝试将参数转换为整数
        const timestamp = parseInt(req.params.date);

        // 检查是否为有效的时间戳
        if (!isNaN(timestamp)) {
            date = new Date(timestamp);
        } else {
            date = new Date(req.params.date);
        }
    }

    // 检查日期是否有效
    if (date.toString() === 'Invalid Date') {
        res.json({ error: "Invalid Date" });
    } else {
        res.json({
            unix: date.getTime(),
            utc: date.toUTCString()
        });
    }
});

// 监听端口
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
