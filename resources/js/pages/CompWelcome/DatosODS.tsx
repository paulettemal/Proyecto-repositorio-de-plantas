import React, { useState } from 'react';

interface ODSItem {
    number: number;
    title: string;
    color: string;
    image: string;
    description: string;
    relation: string;
}

const DatosODS: React.FC = () => {
    const [expandedOds, setExpandedOds] = useState<number | null>(null);

    const toggleOds = (index: number): void => {
        setExpandedOds(expandedOds === index ? null : index);
    };

    const odsData: ODSItem[] = [
        {
            number: 3,
            title: "Salud y Bienestar",
            color: "bg-green-500",
            image: "https://www.un.org/sustainabledevelopment/es/wp-content/uploads/sites/3/2018/07/S_SDG-goals_icons-individual-rgb-03.png",
            description: "Garantizar una vida sana y promover el bienestar para todos en todas las edades.",
            relation: "Nuestro proyecto promueve la salud y el bienestar comunitario a través de la documentación y preservación del conocimiento ancestral sobre plantas medicinales ecuatorianas, proporcionando acceso a alternativas de salud naturales y sostenibles, especialmente valiosas en áreas donde los servicios médicos convencionales son limitados o costosos.",
            },
        {
            number: 4,
            title: "Educación de Calidad",
            color: "bg-red-500",
            image: "https://www.un.org/sustainabledevelopment/es/wp-content/uploads/sites/3/2018/07/S_SDG-goals_icons-individual-rgb-04.png",
            description: "Garantizar una educación inclusiva, equitativa y de calidad y promover oportunidades de aprendizaje durante toda la vida para todos.",
            relation: "Kawsay Sacha contribuye a la educación de calidad mediante la creación de un catálogo digital interactivo que difunde información validada sobre plantas medicinales, implementando programas educativos sobre conservación ambiental, desarrollo sostenible y prácticas responsables dirigidos a comunidades locales, estudiantes y público en general",
            },
        {
            number: 12,
            title: "Producción y Consumo Responsables",
            color: "bg-yellow-500",
            image: "https://www.un.org/sustainabledevelopment/es/wp-content/uploads/sites/3/2018/07/S_SDG-goals_icons-individual-rgb-12.png",
            description: "Garantizar modalidades de consumo y producción sostenibles.",
            relation: "omentamos prácticas de producción sostenible y consumo responsable mediante la promoción de la reforestación y cultivo doméstico de plantas medicinales, incentivando la autonomía y sostenibilidad local mientras combatimos la recolección excesiva sin criterios de sostenibilidad."
        },
        {
            number: 15,
            title: "Vida de Ecosistemas Terrestres",
            color: "bg-green-500",
            image: "https://www.un.org/sustainabledevelopment/es/wp-content/uploads/sites/3/2018/07/S_SDG-goals_icons-individual-rgb-15.png",
            description: "Gestionar sosteniblemente los bosques, luchar contra la desertificación, detener e invertir la degradación de las tierras y detener la pérdida de biodiversidad.",
            relation: "Nuestro trabajo se enfoca directamente en la conservación de la biodiversidad vegetal ecuatoriana, concientizando sobre especies en riesgo de extinción y la relevancia de sus hábitats, promoviendo prácticas sostenibles de uso de la tierra y combatiendo las amenazas como la deforestación y expansión agrícola descontrolada."
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center text-white mb-4">
                Contribución a los Objetivos de Desarrollo Sostenible
            </h2>
            <p className="text-lg text-white text-center mb-12 max-w-3xl mx-auto">
                Nuestro proyecto articula su impacto global demostrando compromiso con un futuro más equitativo y sostenible a través de estos ODS.
            </p>
            
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
                {odsData.map((ods, index) => (
                    <div key={index} className="relative">
                        <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer ${expandedOds === index ? 'opacity-70' : ''}`}  onClick={() => toggleOds(index)} >
                            <div className={`flex items-center p-4 ${ods.color} text-white`}>
                                <div className="w-16 h-16 flex-shrink-0 bg-white p-1 mr-4">
                                    <img src={ods.image} alt={`ODS ${ods.number}`} className="w-full h-full object-contain"/>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">ODS {ods.number}</h3>
                                    <p className="font-medium">{ods.title}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className={`absolute top-0 left-0 w-full h-auto bg-white rounded-xl shadow-2xl z-10 transition-all duration-500 ease-in-out transform ${expandedOds === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}  style={{ zIndex: expandedOds === index ? 20 : 0 }}>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`${ods.color} text-white rounded-lg p-3 inline-flex items-center`}>
                                        <div className="w-12 h-12 bg-white p-1 mr-3">
                                            <img src={ods.image} alt={`ODS ${ods.number}`} className="w-full h-full object-contain"/>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold">ODS {ods.number}</h3>
                                            <p className="text-sm">{ods.title}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setExpandedOds(null)} className="text-gray-500 hover:text-gray-700" >
                                        x
                                    </button>
                                </div>
                                
                                <div className="mb-4">
                                    <h4 className="font-bold text-gray-800 mb-2">Descripción:</h4>
                                    <p className="text-gray-700">{ods.description}</p>
                                </div>
                                
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-bold text-blue-800 mb-2">Relación con nuestro proyecto:</h4>
                                    <p className="text-blue-700">{ods.relation}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DatosODS;