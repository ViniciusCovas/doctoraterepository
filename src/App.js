import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Sidebar = ({ activeItem, setActiveItem }) => {
  const items = [
    { icon: "🎓", name: "Certificado de conclusión" },
    { icon: "🚫", name: "Insatisfacción x Abandono" },
  ];

  return (
    <div style={{ width: '250px', backgroundColor: '#f0f0f0', padding: '20px', height: '100vh' }}>
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
            borderRadius: '5px',
          }}
        >
          <span>{item.icon}</span> {item.name}
        </div>
      ))}
    </div>
  );
};

const ChiSquareTable = ({ data }) => (
  <div style={{ marginTop: '20px' }}>
    <h3>Pruebas de chi-cuadrado</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Prueba</th>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Valor</th>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>gl</th>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Sig. asintótica (bilateral)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.test}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.value}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.df}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.significance}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <p style={{ fontSize: '0.9em', fontStyle: 'italic', marginTop: '10px' }}>{data[0].note}</p>
  </div>
);

const InterpretationSection = ({ interpretations }) => {
  const [activeInterpretation, setActiveInterpretation] = useState('overall');

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Interpretación del Análisis</h3>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        {Object.keys(interpretations).map((key) => (
          <button
            key={key}
            onClick={() => setActiveInterpretation(key)}
            style={{
              marginRight: '10px',
              padding: '5px 10px',
              backgroundColor: activeInterpretation === key ? '#007bff' : '#f0f0f0',
              color: activeInterpretation === key ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>
      <p>{interpretations[activeInterpretation]}</p>
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

  const chiSquareData = [
    { test: "Chi-cuadrado de Pearson", value: "34.997ᵃ", df: "4", significance: "<.001" },
    { test: "Razón de verosimilitud", value: "35.456", df: "4", significance: "<.001" },
    { test: "Asociación lineal por lineal", value: "12.522", df: "1", significance: "<.001" },
    { test: "N de casos válidos", value: "1109", df: "", significance: "" },
  ];
  chiSquareData[0].note = "ᵃ 0 casillas (0.0%) han esperado un recuento menor que 5. El recuento mínimo esperado es 22.69.";

  const interpretations = {
    overall: "En general, se observa una tendencia positiva hacia la motivación proporcionada por los certificados de finalización. Tanto en América del Norte como en América Latina, la mayoría de los participantes están de acuerdo o muy de acuerdo con que un certificado los motiva más a completar el curso.",
    regional: "Existen diferencias notables entre las regiones. Los participantes de América Latina muestran una tendencia más fuerte a estar 'Muy de acuerdo' (42.4%) en comparación con América del Norte (30.8%). Esto sugiere que los certificados podrían ser un incentivo particularmente efectivo en América Latina.",
    statistical: "El análisis chi-cuadrado muestra una significación asintótica bilateral menor a .001, lo que indica una fuerte evidencia estadística de que existe una relación entre la región y la motivación proporcionada por los certificados.",
  };

  return (
    <div>
      <h2>Análisis de Certificado de Conclusión</h2>
      <p>Si la plataforma me ofrece un certificado de finalización del curso, me siento más motivado para completar</p>
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
      <ChiSquareTable data={chiSquareData} />
      <InterpretationSection interpretations={interpretations} />
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

  const chiSquareData = [
    { test: "Chi-cuadrado de Pearson", value: "28.255ᵃ", df: "4", significance: "<.001" },
    { test: "Razón de verosimilitud", value: "28.634", df: "4", significance: "<.001" },
    { test: "Asociación lineal por lineal", value: "12.205", df: "1", significance: "<.001" },
    { test: "N de casos válidos", value: "1109", df: "", significance: "" },
  ];
  chiSquareData[0].note = "ᵃ 0 casillas (0.0%) han esperado un recuento menor que 5. El recuento mínimo esperado es 39.95.";

  const interpretations = {
    overall: "En general, se observa una tendencia mixta en cuanto a la disposición de los estudiantes a abandonar el curso si sienten que obtienen menos de lo esperado. Hay una distribución variada de respuestas en ambas regiones, lo que sugiere que este factor afecta de manera diferente a distintos grupos de estudiantes.",
    regional: "Existen algunas diferencias notables entre las regiones. Los estudiantes de América del Norte muestran una mayor tendencia a estar de acuerdo (38.1%) en comparación con los de América Latina (27.1%). Esto podría indicar que los estudiantes norteamericanos son más propensos a abandonar el curso si no cumple con sus expectativas.",
    statistical: "El análisis chi-cuadrado muestra una significación asintótica bilateral menor a .001, lo que indica una fuerte evidencia estadística de que existe una relación entre la región y la tendencia a abandonar el curso debido a la insatisfacción.",
  };

  return (
    <div>
      <h2>Análisis de Insatisfacción y Abandono</h2>
      <p>Si siento que lo que obtengo es menos de lo que pensé que obtendría cuando me inscribí, dejo el curso de inmediato</p>
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
      <ChiSquareTable data={chiSquareData} />
      <InterpretationSection interpretations={interpretations} />
    </div>
  );
};

function App() {
  const [activeItem, setActiveItem] = useState("Certificado de conclusión");

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <h1>Thesis Research</h1>
        {activeItem === "Certificado de conclusión" && <CertificadoConclusionAnalysis />}
        {activeItem === "Insatisfacción x Abandono" && <InsatisfaccionAbandonoAnalysis />}
      </div>
    </div>
  );
}

export default App;
