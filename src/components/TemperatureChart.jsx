
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
    Tooltip, CartesianGrid } from 'recharts';

function TemperatureChart({ data, theme }) {
    const chartData = data.map(item => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: '2-digit', hour12: true }),
        temp: Math.round(item.main.temp),
        description: item.weather[0].description
    }));

    const isDark = theme === 'dark';
    const axisColor = isDark ? "#cbd5e1" : "#0c2d5aff";
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.6)';
    const tooltipBg = isDark ? '#1e293b' : "#ccc";
    const tooltipText = isDark ? "#fff" : "#0f172a";

    return (
        <div className="chart-container">
            <ResponsiveContainer width="99%" height="100%">
                <AreaChart data={chartData} margin={{
                    top: 10, right: 10, bottom: 0, left: -20 }}>
                    <defs>
                        <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor='#fbbf24' stopOpacity={0.8} />
                            <stop offset="95%" stopColor='#fbbf24' stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                    <XAxis
                        dataKey = "time"
                        stroke = {axisColor}
                        tick = {{ fontSize: 12, fill: axisColor }}
                        tickMargin = {10} 
                    />
                    <YAxis
                        hide = {true}
                        domain = {['dataMin - 2', 'dataMax + 2']}
                    />
                    <Tooltip
                        contentStyle = {{
                            backgroundColor: tooltipBg,
                            border: "none",
                            borderRadius: "8px",
                            color: tooltipText
                        }}
                        itemStyle = {{ color: "#aa7409" }}
                        formatter = {(value) => [`${value}°C`, 'Temp']}
                    />
                    <Area
                        type = "monotone"
                        dataKey = "temp"
                        stroke = "#fbbf24"
                        strokeWidth = {3}
                        fillOpacity = {1}
                        fill = "url(#colorTemp)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
export default TemperatureChart