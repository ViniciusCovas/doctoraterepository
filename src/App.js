import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Sidebar = ({ activeItem, setActiveItem }) => {
  const items = [
    { icon: "🎓", name: "Certificado de conclusión" },
    { icon: "🚫", name: "Insatisfacción x Abandono" },
  ];

  return (
    <div style={{ width: '200px', backgroundColor: '#f0f0f0', padding: '20px' }}>
      {items.map((item) => (
        <div
          key={item.name}
          onClick={() => setActiveItem(item.name)}
          style={{
            cursor: 'pointer',
            padding: '10px',
            backgroundColor: activeItem === item.name ? '#007bff' : 'transparent',
            color: activeItem === item.name ? 'white' : 'black',
            marginBottom: '10px',
          }}
        >
          <span>{item.icon}</span> {item.name}
        </div>
      ))}
    </div>
  );
};

const CertificadoConclusionAnalysis = () => {
  const data = [
    { name: 'Strongly disagree', 'North America': 2.5, 'Latin America': 5.9 },
    { name: 'Disagree', 'North America': 6.9, 'Latin America': 3.8 },
    { name: 'Neither agree nor disagree', 'North America': 18.1, 'Latin America': 10.6 },
    { name: 'Agree', 'North America': 41.6, 'Latin America': 37.3 },
    { name: 'Strongly agree', 'North America': 30.8, 'Latin America': 42.4 },
  ];

  return (
    <div>
      <h2>Análisis de Certificado de Conclusión</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="North America" fill="#8884d8" />
          <Bar dataKey="Latin America" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const InsatisfaccionAbandonoAnalysis = () => {
  const data = [
    { name: 'Strongly disagree', 'North America': 4.4, 'Latin America': 10.2 },
    { name: 'Disagree', 'North America': 17.3, 'Latin America': 22.3 },
    { name: 'Neither agree nor disagree', 'North America': 26.9, 'Latin America': 29.3 },
    { name: 'Agree', 'North America': 38.1, 'Latin America': 27.1 },
    { name: 'Strongly agree', 'North America': 13.3, 'Latin America': 11.2 },
  ];

  return (
    <div>
      <h2>Análisis de Insatisfacción y Abandono</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="North America" fill="#8884d8" />
          <Bar dataKey="Latin America" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

function App() {
  const [activeItem, setActiveItem] = useState("Certificado de conclusión");

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>Thesis Research</h1>
        {activeItem === "Certificado de conclusión" && <CertificadoConclusionAnalysis />}
        {activeItem === "Insatisfacción x Abandono" && <InsatisfaccionAbandonoAnalysis />}
      </div>
    </div>
  );
}

export default App;