import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Sidebar = ({ activeItem, setActiveItem }) => {
  const items = [
    { icon: "🎓", name: "Certificado de conclusión" },
    { icon: "🚫", name: "Insatisfacción x Abandono" },
    { icon: "🎯", name: "Conclusión X Expectativa" },
  ];

  return (
    <div style={{ width: '200px', backgroundColor: '#f0f0f0', padding: '10px', height: '100vh', overflowY: 'auto' }}>
      {items.map((item) => (
        <div
          key={item.name}
          onClick={() => setActiveItem(item.name)}
          style={{
            cursor: 'pointer',
            padding: '8px',
            backgroundColor: activeItem === item.name ? '#007bff' : 'transparent',
            color: activeItem === item.name ? 'white' : 'black',
            marginBottom: '5px',
            borderRadius: '4px',
            fontSize: '0.9em',
          }}
        >
          <span>{item.icon}</span> {item.name}
        </div>
      ))}
    </div>
  );
};

const ChiSquareTable = ({ data }) => (
  <div style={{ marginTop: '10px', fontSize: '0.8em' }}>
    <h4 style={{ marginBottom: '5px' }}>Pruebas de chi-cuadrado</h4>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <th style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'left' }}>Prueba</th>
          <th style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'left' }}>Valor</th>
          <th style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'left' }}>gl</th>
          <th style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'left' }}>Sig.</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
            <td style={{ border: '1px solid #ddd', padding: '4px' }}>{row.test}</td>
            <td style={{ border: '1px solid #ddd', padding: '4px' }}>{row.value}</td>
            <td style={{ border: '1px solid #ddd', padding: '4px' }}>{row.df}</td>
            <td style={{ border: '1px solid #ddd', padding: '4px' }}>{row.significance}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <p style={{ fontSize: '0.8em', fontStyle: 'italic', marginTop: '5px' }}>{data[0].note}</p>
  </div>
);

const InterpretationSection = ({ interpretations }) => {
  const [activeInterpretation, setActiveInterpretation] = useState('overall');

  return (
    <div style={{ marginBottom: '15px', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '5px' }}>
      <h4 style={{ marginBottom: '10px' }}>Interpretación del Análisis</h4>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        {Object.keys(interpretations).map((key) => (
          <button
            key={key}
            onClick={() => setActiveInterpretation(key)}
            style={{
              marginRight: '5px',
              padding: '3px 8px',
              backgroundColor: activeInterpretation === key ? '#007bff' : '#e9ecef',
              color: activeInterpretation === key ? 'white' : 'black',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '0.8em',
            }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>
      <p style={{ fontSize: '0.9em', margin: 0 }}>{interpretations[activeInterpretation]}</p>
    </div>
  );
};

const AnalysisSection = ({ title, subtitle, data, chiSquareData, interpretations }) => (
  <div style={{ marginBottom: '20px' }}>
    <h3 style={{ marginBottom: '5px' }}>{title}</h3>
    <p style={{ fontSize: '0.9em', marginBottom: '10px' }}>{subtitle}</p>
    <InterpretationSection interpretations={interpretations} />
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: '10px' }} />
        <Bar dataKey="North America" fill="#8884d8" />
        <Bar dataKey="Latin America" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
    <ChiSquareTable data={chiSquareData} />
  </div>
);

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
    overall: "En general, se observa una tendencia positiva hacia la motivación proporcionada por los certificados de finalización en ambas regiones.",
    regional: "Los participantes de América Latina muestran una tendencia más fuerte a estar 'Muy de acuerdo' (42.4%) en comparación con América del Norte (30.8%).",
    statistical: "El análisis chi-cuadrado (p<.001) indica una fuerte evidencia de relación entre la región y la motivación proporcionada por los certificados.",
  };

  return (
    <AnalysisSection
      title="Análisis de Certificado de Conclusión"
      subtitle="Si la plataforma me ofrece un certificado de finalización del curso, me siento más motivado para completar"
      data={data}
      chiSquareData={chiSquareData}
      interpretations={interpretations}
    />
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
    overall: "Se observa una tendencia mixta en cuanto a la disposición de los estudiantes a abandonar el curso si no cumple las expectativas.",
    regional: "Los estudiantes de América del Norte muestran una mayor tendencia a estar de acuerdo (38.1%) en comparación con los de América Latina (27.1%).",
    statistical: "El análisis chi-cuadrado (p<.001) indica una fuerte evidencia de relación entre la región y la tendencia a abandonar el curso debido a la insatisfacción.",
  };

  return (
    <AnalysisSection
      title="Análisis de Insatisfacción y Abandono"
      subtitle="Si siento que lo que obtengo es menos de lo que pensé que obtendría cuando me inscribí, dejo el curso de inmediato"
      data={data}
      chiSquareData={chiSquareData}
      interpretations={interpretations}
    />
  );
};

const ConclusionExpectativaAnalysis = () => {
  const data = [
    { name: 'Strongly disagree', 'North America': 3.7, 'Latin America': 12.4 },
    { name: 'Disagree', 'North America': 14.1, 'Latin America': 16.3 },
    { name: 'Neither agree nor disagree', 'North America': 21.2, 'Latin America': 19.4 },
    { name: 'Agree', 'North America': 45.0, 'Latin America': 32.5 },
    { name: 'Strongly agree', 'North America': 16.0, 'Latin America': 19.4 },
  ];

  const chiSquareData = [
    { test: "Chi-cuadrado de Pearson", value: "40.328ᵃ", df: "4", significance: "<.001" },
    { test: "Razón de verosimilitud", value: "41.695", df: "4", significance: "<.001" },
    { test: "Asociación lineal por lineal", value: "28.260", df: "1", significance: "<.001" },
    { test: "N de casos válidos", value: "1109", df: "", significance: "" },
  ];
  chiSquareData[0].note = "ᵃ 0 casillas (0.0%) han esperado un recuento menor que 5. El recuento mínimo esperado es 43.90.";

  const interpretations = {
    overall: "La mayoría de los estudiantes en ambas regiones están dispuestos a terminar el curso para lograr un objetivo, incluso si no cumple las expectativas iniciales.",
    regional: "Los estudiantes de América del Norte muestran una mayor tendencia a estar de acuerdo (45.0%) en comparación con los de América Latina (32.5%).",
    statistical: "El análisis chi-cuadrado (p<.001) indica una fuerte evidencia de relación entre la región y la disposición a completar el curso a pesar de no cumplir las expectativas.",
  };

  return (
    <AnalysisSection
      title="Análisis de Conclusión vs Expectativa"
      subtitle="Terminaría un curso solo para lograr un objetivo, incluso si el curso no corresponde a lo que esperaba"
      data={data}
      chiSquareData={chiSquareData}
      interpretations={interpretations}
    />
  );
};

function App() {
  const [activeItem, setActiveItem] = useState("Certificado de conclusión");

  return (
    <div style={{ display: 'flex', minHeight: '100vh', maxWidth: '1200px', margin: '0 auto' }}>
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div style={{ flex: 1, padding: '15px', overflowY: 'auto' }}>
        <h2 style={{ marginBottom: '15px' }}>Thesis Research Dashboard</h2>
        {activeItem === "Certificado de conclusión" && <CertificadoConclusionAnalysis />}
        {activeItem === "Insatisfacción x Abandono" && <InsatisfaccionAbandonoAnalysis />}
        {activeItem === "Conclusión X Expectativa" && <ConclusionExpectativaAnalysis />}
      </div>
    </div>
  );
}

export default App;
