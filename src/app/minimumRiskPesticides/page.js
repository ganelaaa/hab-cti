"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "state-policies", label: "State Specific Minimum Risk Policies" },
  { id: "conditions", label: "Minimum Risk Conditions" },
  { id: "table1", label: "Table 1: Active Ingredients" },
  { id: "table2", label: "Table 2: Inert Ingredients" },
  { id: "additional-information", label: "Additional Information" },
  { id: "questions", label: "Questions about Minimum Risk Pesticides?" },
];

const externalLinks = {
  minimumRiskEPA: "https://www.epa.gov/minimum-risk-pesticides",
  cfr15225f:
    "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-152/subpart-B/section-152.25",
  cfr180950:
    "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-180/subpart-D/section-180.950",
  pesticideChemicalSearch:
    "https://www.epa.gov/pesticide-registration/pesticide-chemical-search",
  inertIngredientFinder:
    "https://www.epa.gov/ingredients-used-pesticide-products/inert-ingredient-finder",
  cfr180:
    "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-180",
  tolerancesEPA: "https://www.epa.gov/pesticide-tolerances",
  npicStateAgencies: "https://npic.orst.edu/reg/state_agencies.html",
  conditionsEPA:
    "https://www.epa.gov/minimum-risk-pesticides/conditions-minimum-risk-pesticides",
};

const activeIngredients = [
  {
    label: "Castor oil",
    chemical: "Castor oil",
    specs: "United States Pharmacopeia (U.S.P.) or equivalent",
    cas: "8001-79-4",
  },
  {
    label: "Cedarwood oil",
    chemical: "Cedarwood oil (China)",
    specs: "",
    cas: "85085-29-6",
  },
  {
    label: "Cedarwood oil",
    chemical: "Cedarwood oil (Texas)",
    specs: "",
    cas: "68990-83-0",
  },
  {
    label: "Cedarwood oil",
    chemical: "Cedarwood oil (Virginia)",
    specs: "",
    cas: "8000-27-9",
  },
  {
    label: "Chitosan",
    chemical: "Poly-D-glucosamine",
    specs:
      "Includes chitosan salts (consisting solely of those salts that can be formed with the acids listed in this table or table 2)",
    cas: "9012-76-4",
  },
  { label: "Cinnamon", chemical: "Cinnamon", specs: "", cas: "N/A" },
  {
    label: "Cinnamon oil",
    chemical: "Cinnamon oil",
    specs: "",
    cas: "8015-91-6",
  },
  {
    label: "Citric acid",
    chemical: "2-Hydroxypropane-1,2,3-tricarboxylic acid",
    specs: "",
    cas: "77-92-9",
  },
  { label: "Citronella", chemical: "Citronella", specs: "", cas: "N/A" },
  {
    label: "Citronella oil",
    chemical: "Citronella oil",
    specs: "",
    cas: "8000-29-1",
  },
  { label: "Cloves", chemical: "Cloves", specs: "", cas: "N/A" },
  { label: "Clove oil", chemical: "Clove oil", specs: "", cas: "8000-34-8" },
  {
    label: "Corn gluten meal",
    chemical: "Corn gluten meal",
    specs: "",
    cas: "66071-96-3",
  },
  { label: "Corn oil", chemical: "Corn oil", specs: "", cas: "8001-30-7" },
  { label: "Cornmint", chemical: "Cornmint", specs: "", cas: "N/A" },
  {
    label: "Cornmint oil",
    chemical: "Cornmint oil",
    specs: "",
    cas: "68917-18-0",
  },
  {
    label: "Cottonseed oil",
    chemical: "Cottonseed oil",
    specs: "",
    cas: "8001-29-4",
  },
  {
    label: "Dried blood",
    chemical: "Dried blood",
    specs: "",
    cas: "68991-49-9",
  },
  {
    label: "Eugenol",
    chemical: "4-Allyl-2-methoxyphenol",
    specs: "",
    cas: "97-53-0",
  },
  { label: "Garlic", chemical: "Garlic", specs: "", cas: "N/A" },
  { label: "Garlic oil", chemical: "Garlic oil", specs: "", cas: "8000-78-0" },
  {
    label: "Geraniol",
    chemical: "(2E)-3,7-Dimethylocta-2,6-dien-1-ol",
    specs: "",
    cas: "106-24-1",
  },
  {
    label: "Geranium oil",
    chemical: "Geranium oil",
    specs: "",
    cas: "8000-46-2",
  },
  {
    label: "Lauryl sulfate",
    chemical: "Lauryl sulfate",
    specs: "",
    cas: "151-41-7",
  },
  {
    label: "Lemongrass oil",
    chemical: "Lemongrass oil",
    specs: "",
    cas: "8007-02-1",
  },
  {
    label: "Linseed oil",
    chemical: "Linseed oil",
    specs: "",
    cas: "8001-26-1",
  },
  {
    label: "Malic acid",
    chemical: "2-Hydroxybutanedioic acid",
    specs: "",
    cas: "6915-15-7",
  },
  { label: "Peppermint", chemical: "Peppermint", specs: "", cas: "N/A" },
  {
    label: "Peppermint oil",
    chemical: "Peppermint oil",
    specs: "",
    cas: "8006-90-4",
  },
  {
    label: "2-Phenylethyl propionate",
    chemical: "2-Phenylethyl propionate",
    specs: "",
    cas: "122-70-3",
  },
  {
    label: "Potassium sorbate",
    chemical: "Potassium (2E,4E)-hexa-2,4-dienoate",
    specs: "",
    cas: "24634-61-5",
  },
  {
    label: "Putrescent whole egg solids",
    chemical: "Putrescent whole egg solids",
    specs: "",
    cas: "51609-52-0",
  },
  { label: "Rosemary", chemical: "Rosemary", specs: "", cas: "N/A" },
  {
    label: "Rosemary oil",
    chemical: "Rosemary oil",
    specs: "",
    cas: "8000-25-7",
  },
  {
    label: "Sesame",
    chemical: "Sesame",
    specs: "Includes ground sesame plant",
    cas: "N/A",
  },
  { label: "Sesame oil", chemical: "Sesame oil", specs: "", cas: "8008-74-0" },
  {
    label: "Sodium chloride",
    chemical: "Sodium chloride",
    specs: "",
    cas: "7647-14-5",
  },
  {
    label: "Sodium lauryl sulfate",
    chemical: "Sulfuric acid monododecyl ester, sodium salt",
    specs: "",
    cas: "151-21-3",
  },
  {
    label: "Soybean oil",
    chemical: "Soybean oil",
    specs: "",
    cas: "8001-22-7",
  },
  { label: "Spearmint", chemical: "Spearmint", specs: "", cas: "N/A" },
  {
    label: "Spearmint oil",
    chemical: "Spearmint oil",
    specs: "",
    cas: "8008-79-5",
  },
  { label: "Thyme", chemical: "Thyme", specs: "", cas: "N/A" },
  { label: "Thyme oil", chemical: "Thyme oil", specs: "", cas: "8007-46-3" },
  { label: "White pepper", chemical: "White pepper", specs: "", cas: "N/A" },
  {
    label: "Zinc",
    chemical: "Zinc",
    specs: "Zinc metal strips (consisting solely of zinc metal and impurities)",
    cas: "7440-66-6",
  },
];

const inertIngredients = [
  {
    label: "Acetyl tributyl citrate",
    chemical: "Citric acid, 2-(acetyloxy)-, tributyl ester",
    cas: "77-90-7",
  },
  { label: "Agar", chemical: "Agar", cas: "9002-18-0" },
  { label: "Almond hulls", chemical: "Almond hulls", cas: "N/A" },
  { label: "Almond oil", chemical: "Oils, almond", cas: "8007-69-0" },
  { label: "Almond shells", chemical: "Almond shells", cas: "N/A" },
  {
    label: "alpha-Cyclodextrin",
    chemical: "alpha-Cyclodextrin",
    cas: "10016-20-3",
  },
  {
    label: "Aluminatesilicate",
    chemical: "Aluminatesilicate",
    cas: "1327-36-2",
  },
  {
    label: "Aluminum magnesium silicate",
    chemical: "Silicic acid, aluminum magnesium salt",
    cas: "1327-43-1",
  },
  {
    label: "Aluminum potassium sodium silicate",
    chemical: "Silicic acid, aluminum potassium sodium salt",
    cas: "12736-96-8",
  },
  {
    label: "Aluminum silicate",
    chemical: "Aluminum silicate",
    cas: "1335-30-4",
  },
  {
    label: "Aluminum sodium silicate",
    chemical: "Silicic acid, aluminum sodium salt",
    cas: "1344-00-9",
  },
  {
    label: "Ammonium benzoate",
    chemical: "Benzoic acid, ammonium salt",
    cas: "1863-63-4",
  },
  {
    label: "Ammonium stearate",
    chemical: "Octadecanoic acid, ammonium salt",
    cas: "1002-89-7",
  },
  { label: "Animal glue", chemical: "Animal glue", cas: "N/A" },
  {
    label: "Ascorbyl palmitate",
    chemical: "Ascorbyl palmitate",
    cas: "137-66-6",
  },
  {
    label: "Attapulgite-type clay",
    chemical: "Attapulgite-type clay",
    cas: "12174-11-7",
  },
  { label: "Beeswax", chemical: "Beeswax", cas: "8012-89-3" },
  { label: "Bentonite", chemical: "Bentonite", cas: "1302-78-9" },
  {
    label: "beta-Cyclodextrin",
    chemical: "beta-Cyclodextrin",
    cas: "7585-39-9",
  },
  { label: "Bone meal", chemical: "Bone meal", cas: "68409-75-6" },
  { label: "Bran", chemical: "Bran", cas: "N/A" },
  { label: "Bread crumbs", chemical: "Bread crumbs", cas: "N/A" },
  {
    label: "Butyl lactate",
    chemical: "Lactic acid, n-butyl ester",
    cas: "138-22-7",
  },
  {
    label: "Butyl stearate",
    chemical: "Octadecanoic acid, butyl ester",
    cas: "123-95-5",
  },
  { label: "Calcium acetate", chemical: "Calcium acetate", cas: "62-54-4" },
  {
    label: "Calcium carbonate",
    chemical: "Calcium carbonate",
    cas: "471-34-1",
  },
  {
    label: "Calcium citrate",
    chemical: "Citric acid, calcium salt",
    cas: "7693-13-2",
  },
  {
    label: "Calcium silicate",
    chemical: "Silicic acid, calcium salt",
    cas: "1344-95-2",
  },
  {
    label: "Calcium stearate",
    chemical: "Octadecanoic acid, calcium salt",
    cas: "1592-23-0",
  },
  { label: "Calcium sulfate", chemical: "Calcium sulfate", cas: "7778-18-9" },
  { label: "Carbon", chemical: "Carbon", cas: "7440-44-0" },
  { label: "Carbon dioxide", chemical: "Carbon dioxide", cas: "124-38-9" },
  {
    label: "Carboxymethyl cellulose",
    chemical: "Cellulose, carboxymethyl ether",
    cas: "9000-11-7",
  },
  { label: "Carnauba wax", chemical: "Carnauba wax", cas: "8015-86-9" },
  { label: "Carob gum", chemical: "Locust bean gum", cas: "9000-40-2" },
  { label: "Carrageenan", chemical: "Carrageenan", cas: "9000-07-1" },
  { label: "Caseins", chemical: "Caseins", cas: "9000-71-9" },
  { label: "Castor oil", chemical: "Castor oil", cas: "8001-79-4" },
  {
    label: "Castor oil, hydrogenated",
    chemical: "Castor oil, hydrogenated",
    cas: "8001-78-3",
  },
  { label: "Cellulose", chemical: "Cellulose", cas: "9004-34-6" },
  { label: "Citric acid", chemical: "Citric acid", cas: "77-92-9" },
  { label: "Cocoa", chemical: "Cocoa", cas: "8002-31-1" },
  { label: "Corn cobs", chemical: "Corn cobs", cas: "N/A" },
  { label: "Cotton", chemical: "Cotton", cas: "N/A" },
  { label: "Dextrins", chemical: "Dextrins", cas: "9004-53-9" },
  {
    label: "Diatomaceous earth",
    chemical: "Kieselguhr; Diatomite (less than 1% crystalline silica)",
    cas: "61790-53-2",
  },
  { label: "Dolomite", chemical: "Dolomite", cas: "16389-88-1" },
  { label: "Egg shells", chemical: "Egg shells", cas: "N/A" },
  { label: "Eggs", chemical: "Eggs", cas: "N/A" },
  {
    label: "Ethyl lactate",
    chemical: "Lactic acid, ethyl ester",
    cas: "97-64-3",
  },
  { label: "Feldspar", chemical: "Feldspar", cas: "68476-25-5" },
  { label: "Ferric oxide", chemical: "Iron oxide (Fe2 O3)", cas: "1309-37-1" },
  { label: "Fish meal", chemical: "Fish meal", cas: "N/A" },
  { label: "Fish oil", chemical: "Fish oil", cas: "8016-13-5" },
  { label: "Fuller's earth", chemical: "Fuller's earth", cas: "8031-18-3" },
  { label: "Fumaric acid", chemical: "Fumaric acid", cas: "110-17-8" },
  {
    label: "gamma-Cyclodextrin",
    chemical: "gamma-Cyclodextrin",
    cas: "17465-86-0",
  },
  { label: "Gelatins", chemical: "Gelatins", cas: "9000-70-8" },
  { label: "Glycerin", chemical: "1,2,3-Propanetriol", cas: "56-81-5" },
  {
    label: "Glycerol monooleate",
    chemical: "9-Octadecenoic acid (Z)-, 2,3-dihydroxypropyl ester",
    cas: "111-03-5",
  },
  {
    label: "Glyceryl monostearate",
    chemical: "Octadecanoic acid, monoester with 1,2,3-propanetriol",
    cas: "31566-31-1",
  },
  { label: "Granite", chemical: "Granite", cas: "N/A" },
  { label: "Graphite", chemical: "Graphite", cas: "7782-42-5" },
  { label: "Guar gum", chemical: "Guar gum", cas: "9000-30-0" },
  { label: "Gum Arabic", chemical: "Gum arabic", cas: "9000-01-5" },
  { label: "Gypsum", chemical: "Gypsum", cas: "13397-24-5" },
  { label: "Humic acid", chemical: "Humic acid", cas: "1415-93-6" },
  {
    label: "Hydroxyethyl cellulose",
    chemical: "Cellulose, 2-hydroxyethyl ether",
    cas: "9004-62-0",
  },
  {
    label: "Hydroxypropyl cellulose",
    chemical: "Cellulose, 2-hydroxypropyl ether",
    cas: "9004-64-2",
  },
  { label: "Isopropyl alcohol", chemical: "2-Propanol", cas: "67-63-0" },
  { label: "Kaolin", chemical: "Kaolin", cas: "1332-58-7" },
  { label: "Lactose", chemical: "Lactose", cas: "63-42-3" },
  { label: "Lanolin", chemical: "Lanolin", cas: "8006-54-0" },
  { label: "Lauric acid", chemical: "Lauric acid", cas: "143-07-7" },
  { label: "Lecithins", chemical: "Lecithins", cas: "8002-43-5" },
  { label: "Limestone", chemical: "Limestone", cas: "1317-65-3" },
  { label: "Linseed oil", chemical: "Linseed oil", cas: "8001-26-1" },
  {
    label: "Magnesium carbonate",
    chemical: "Carbonic acid, magnesium salt (1:1)",
    cas: "546-93-0",
  },
  { label: "Magnesium oxide", chemical: "Magnesium oxide", cas: "1309-48-4" },
  {
    label: "Magnesium silicate",
    chemical: "Magnesium silicate",
    cas: "1343-88-0",
  },
  {
    label: "Magnesium stearate",
    chemical: "Octadecanoic acid, magnesium salt",
    cas: "557-04-0",
  },
  {
    label: "Magnesium sulfate",
    chemical: "Magnesium sulfate",
    cas: "7487-88-9",
  },
  { label: "Malic acid", chemical: "Malic acid", cas: "6915-15-7" },
  { label: "Malt extract", chemical: "Malt extract", cas: "8002-48-0" },
  { label: "Maltodextrin", chemical: "Maltodextrin", cas: "9050-36-6" },
  {
    label: "Methylcellulose",
    chemical: "Cellulose, methyl ether",
    cas: "9004-67-5",
  },
  { label: "Mica", chemical: "Mica", cas: "12003-38-2" },
  { label: "Milk", chemical: "Milk", cas: "8049-98-7" },
  { label: "Mineral oil", chemical: "Mineral oil (U.S.P.)", cas: "8012-95-1" },
  { label: "Nitrogen", chemical: "Nitrogen", cas: "7727-37-9" },
  { label: "Oleic acid", chemical: "Oleic acid", cas: "112-80-1" },
  { label: "Oyster shells", chemical: "Oyster shells", cas: "N/A" },
  { label: "Palm oil", chemical: "Palm oil", cas: "8002-75-3" },
  { label: "Palmitic acid", chemical: "Hexadecanoic acid", cas: "57-10-3" },
  { label: "Paper", chemical: "Paper", cas: "N/A" },
  { label: "Paraffin wax", chemical: "Paraffin wax", cas: "8002-74-2" },
  { label: "Peat moss", chemical: "Peat moss", cas: "N/A" },
  { label: "Pectin", chemical: "Pectin", cas: "9000-69-5" },
  { label: "Perlite", chemical: "Perlite", cas: "130885-09-5" },
  { label: "Polyethylene", chemical: "Polyethylene", cas: "9002-88-4" },
  {
    label: "Potassium benzoate",
    chemical: "Benzoic acid, potassium salt",
    cas: "582-25-2",
  },
  {
    label: "Potassium bicarbonate",
    chemical: "Carbonic acid, monopotassium salt",
    cas: "298-14-6",
  },
  {
    label: "Potassium chloride",
    chemical: "Potassium chloride",
    cas: "7447-40-7",
  },
  {
    label: "Potassium citrate",
    chemical: "Citric acid, potassium salt",
    cas: "7778-49-6",
  },
  {
    label: "Potassium sorbate",
    chemical: "Sorbic acid, potassium salt",
    cas: "24634-61-5",
  },
  {
    label: "Potassium stearate",
    chemical: "Octadecanoic acid, potassium salt",
    cas: "593-29-3",
  },
  {
    label: "Potassium sulfate",
    chemical: "Potassium sulfate",
    cas: "7778-80-5",
  },
  { label: "Pumice", chemical: "Pumice", cas: "1332-09-8" },
  { label: "Rubber", chemical: "Rubber", cas: "9006-04-6" },
  { label: "Sawdust", chemical: "Sawdust", cas: "N/A" },
  { label: "Silica gel", chemical: "Silica gel", cas: "63231-67-4" },
  {
    label: "Soap",
    chemical: "Soap (water soluble sodium or potassium salts of fatty acids)",
    cas: "N/A",
  },
  {
    label: "Sodium acetate",
    chemical: "Acetic acid, sodium salt",
    cas: "127-09-3",
  },
  { label: "Sodium alginate", chemical: "Sodium alginate", cas: "9005-38-3" },
  {
    label: "Sodium benzoate",
    chemical: "Benzoic acid, sodium salt",
    cas: "532-32-1",
  },
  {
    label: "Sodium bicarbonate",
    chemical: "Sodium bicarbonate",
    cas: "144-55-8",
  },
  { label: "Sodium chloride", chemical: "Sodium chloride", cas: "7647-14-5" },
  { label: "Sodium citrate", chemical: "Sodium citrate", cas: "994-36-5" },
  {
    label: "Sodium stearate",
    chemical: "Octadecanoic acid, sodium salt",
    cas: "822-16-2",
  },
  { label: "Sodium sulfate", chemical: "Sodium sulfate", cas: "7757-82-6" },
  { label: "Sorbitol", chemical: "D-glucitol", cas: "50-70-4" },
  { label: "Soy protein", chemical: "Soy protein", cas: "N/A" },
  { label: "Soybean meal", chemical: "Soybean meal", cas: "68308-36-1" },
  { label: "Stearic acid", chemical: "Octadecanoic acid", cas: "57-11-4" },
  { label: "Sulfur", chemical: "Sulfur", cas: "7704-34-9" },
  { label: "Urea", chemical: "Urea", cas: "57-13-6" },
  {
    label: "Vanillin",
    chemical: "Benzaldehyde, 4-hydroxy-3-methoxy-",
    cas: "121-33-5",
  },
  { label: "Vermiculite", chemical: "Vermiculite", cas: "1318-00-9" },
  {
    label: "Vinegar",
    chemical: "Vinegar (maximum 8% acetic acid in solution)",
    cas: "8028-52-2",
  },
  { label: "Vitamin C", chemical: "L-Ascorbic acid", cas: "50-81-7" },
  { label: "Vitamin E", chemical: "Vitamin E", cas: "1406-18-4" },
  { label: "Walnut shells", chemical: "Walnut shells", cas: "N/A" },
  { label: "Wheat flour", chemical: "Wheat flour", cas: "N/A" },
  { label: "Wheat germ oil", chemical: "Wheat germ oil", cas: "8006-95-9" },
  { label: "Whey", chemical: "Whey", cas: "92129-90-3" },
  {
    label: "White mineral oil",
    chemical: "White mineral oil (petroleum)",
    cas: "8042-47-5",
  },
  { label: "Xanthan gum", chemical: "Xanthan gum", cas: "11138-66-2" },
  { label: "Yeast", chemical: "Yeast", cas: "68876-77-7" },
  {
    label: "Zeolites",
    chemical: "Zeolites (excluding erionite CAS 66733-21-9)",
    cas: "1318-02-1",
  },
  { label: "Zinc oxide", chemical: "Zinc oxide (ZnO)", cas: "1314-13-2" },
  {
    label: "Zinc stearate",
    chemical: "Octadecanoic acid, zinc salt",
    cas: "557-05-1",
  },
];

function ExternalLink({ href, children, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-primary text-underline ${className}`}
    >
      {children}
    </a>
  );
}

function IngredientTable({ caption, columns, rows }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse border border-gray-500 text-sm text-black">
        <caption className="border border-b-0 border-gray-500 bg-gray-300 px-4 py-3 text-center text-lg font-bold text-black">
          {caption}
        </caption>
        <thead>
          <tr className="bg-gray-300">
            {columns.map((col) => (
              <th
                key={col}
                className="border border-gray-500 px-4 py-3 font-bold text-center"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td className="border border-gray-500 px-4 py-2">{row.label}</td>
              <td className="border border-gray-500 px-4 py-2">
                {row.chemical}
              </td>
              {row.specs !== undefined && (
                <td className="border border-gray-500 px-4 py-2">
                  {row.specs}
                </td>
              )}
              <td className="border border-gray-500 px-4 py-2 text-center">
                {row.cas}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MinimumRiskPesticides() {
  const [activeSection, setActiveSection] = useState("overview");

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section.id);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="px-20 py-10 tracking-wide">
      {/* Breadcrumb */}
      <div className="mb-8 flex flex-row items-center gap-2 text-sm text-gray-500">
        <svg
          className="usa-icon text-gray-500"
          aria-hidden="true"
          focusable="false"
          role="img"
        >
          <use href="/assets/img/sprite.svg#arrow_back"></use>
        </svg>
        <Link href="/" className="text-primary hover:underline">
          Home
        </Link>
        <span>›</span>
        <span className="text-primary">Processing Permits</span>
        <span>›</span>
        <Link href="/agency/405" className="text-primary hover:underline">
          FIFRA
        </Link>
        <span>›</span>
        <Link
          href="/pesticideRegistration"
          className="text-primary hover:underline"
        >
          Pesticide Registration
        </Link>
        <span>›</span>
        <span className="text-gray-800">Minimum Risk Pesticides</span>
      </div>

      {/* Page Hero Title */}
      <InternalPageHero
        title="Minimum Risk Pesticides"
        subtitle="Active and Inert Pesticide Ingredients"
        link={externalLinks.minimumRiskEPA}
      />

      {/* Body */}
      <div className="mt-0 flex flex-row gap-10">
        {/* Sticky nav */}
        <div className="mt-10 w-56 shrink-0">
          <div className="sticky top-8">
            <p className="mb-3 font-bold text-black">On this page</p>
            <div className="flex flex-col border-l-2 border-gray-200">
              {sections.map((section) => (
                <p
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`cursor-pointer py-2 pl-4 text-sm transition-colors duration-200 hover:text-primary ${
                    activeSection === section.id
                      ? "-ml-[2px] border-l-4 border-black font-semibold text-black"
                      : "text-primary"
                  }`}
                >
                  {section.label}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          {/* Overview */}
          <div
            id="overview"
            className="mt-10 scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Overview</h1>
            <div className="mb-8 text-lg">
              <p>
                Minimum risk pesticide products, also referred to as 25(b)
                exempt products, are made of ingredients that pose little to no
                risk to human health or the environment. Pesticide products
                meeting the six conditions defined in{" "}
                <ExternalLink href={externalLinks.cfr15225f}>
                  40 CFR 152.25(f)
                </ExternalLink>{" "}
                are exempt from the Federal Insecticide, Fungicide, and
                Rodenticide Act (FIFRA) regulations. Products that claim to meet
                minimum risk conditions are generally not reviewed by the EPA.
                However, the producer must ensure that the product meets all
                exemption criteria to avoid FIFRA violations.
              </p>
            </div>
          </div>

          {/* State Policies */}
          <div
            id="state-policies"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">
              State Specific Minimum Risk Policies
            </h1>
            <div className="mb-8 text-lg">
              <p>
                Each state has its own statutes and regulations concerning
                pesticides, including registration, sales, and use. States are
                not required to permit the sale of a minimum risk product simply
                because it is exempt under federal pesticide law (FIFRA).
              </p>
              <p className="mt-5">
                To determine the policy of an individual state, use the external
                link to the{" "}
                <ExternalLink href={externalLinks.npicStateAgencies}>
                  National Pesticide Information Center
                </ExternalLink>{" "}
                or the internal link to the{" "}
                <Link
                  href="/regulationsDirectory"
                  className="text-primary text-underline"
                >
                  US Regulatory Map
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Conditions */}
          <div
            id="conditions"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Minimum Risk Conditions</h1>
            <div className="mb-8 text-lg">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black text-sm font-bold text-black">
                    1
                  </span>
                  <p>
                    The product's active ingredients must only be those listed
                    in{" "}
                    <ExternalLink href={externalLinks.cfr15225f}>
                      40 CFR 152.25(f)(1) Table 1
                    </ExternalLink>
                    . Active Ingredients Permitted in Exempted Minimum Risk
                    Pesticide Products.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black text-sm font-bold text-black">
                    2
                  </span>
                  <div>
                    <p>
                      The product's inert ingredients may only be those
                      classified by the EPA as:
                    </p>
                    <ul className="mt-3 ml-6 list-disc">
                      <li>
                        Listed in{" "}
                        <ExternalLink href={externalLinks.cfr15225f}>
                          40 CFR 152.25(f)(2) Table 2
                        </ExternalLink>
                        . Inert Ingredients Permitted in Minimum Risk Pesticide
                        Products.
                      </li>
                      <li>
                        Commonly consumed food commodities, animal feed items,
                        and edible fats and oils as described in{" "}
                        <ExternalLink href={externalLinks.cfr180950}>
                          40 CFR 180.950(a), (b), and (c)
                        </ExternalLink>
                        .
                      </li>
                      <li>
                        Certain chemical substances listed under{" "}
                        <ExternalLink href={externalLinks.cfr180950}>
                          40 CFR 180.950(e)
                        </ExternalLink>
                        .
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black text-sm font-bold text-black">
                    3
                  </span>
                  <p>
                    All of the ingredients (both active and inert) must be
                    listed on the label. The active ingredient(s) must be listed
                    by label display name and percentage by weight. Each inert
                    ingredient must be listed by label display name.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black text-sm font-bold text-black">
                    4
                  </span>
                  <p>
                    The product must not bear claims either to control or
                    mitigate organisms that pose a threat to human health, or
                    insects or rodents carrying specific diseases.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black text-sm font-bold text-black">
                    5
                  </span>
                  <p>
                    The name of the producer or the company for whom the product
                    was produced and the company's contact information must be
                    displayed prominently on the product label.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black text-sm font-bold text-black">
                    6
                  </span>
                  <p>
                    The label cannot include any false or misleading statements.
                  </p>
                </div>
              </div>
              <p className="mt-5 text-base text-gray-600">
                Note: Conditions 3–6 apply to all pesticide products.
              </p>
            </div>
          </div>

          {/* Table 1 */}
          <div
            id="table1"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">
              Table 1: Active Ingredients Permitted in Exempted Minimum Risk
              Pesticide Products
            </h1>
            <div className="mb-8">
              <IngredientTable
                caption="Table 1. Active Ingredients Permitted in Exempted Minimum Risk Pesticide Products"
                columns={[
                  "Label Display Name",
                  "Chemical Name",
                  "Specifications",
                  "CAS No.",
                ]}
                rows={activeIngredients}
              />
            </div>
          </div>

          {/* Table 2 */}
          <div
            id="table2"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">
              Table 2: Inert Ingredients Permitted in Exempted Minimum Risk
              Pesticide Products
            </h1>
            <div className="mb-8">
              <IngredientTable
                caption="Table 2. Inert Ingredients Permitted in Exempted Minimum Risk Pesticide Products"
                columns={["Label Display Name", "Chemical Name", "CAS No."]}
                rows={inertIngredients}
              />
              <p className="mt-4 text-base">
                This information was collected from the{" "}
                <ExternalLink href={externalLinks.conditionsEPA}>
                  EPA's Conditions for Minimum Risk Pesticides webpage
                </ExternalLink>{" "}
                unless otherwise specified.
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div
            id="additional-information"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Additional Information</h1>
            <div className="mb-8 text-lg">
              <ul className="mt-3 ml-6 list-disc">
                <li>
                  Additional information on registered active ingredients can be
                  found by searching the{" "}
                  <ExternalLink href={externalLinks.pesticideChemicalSearch}>
                    EPA's Pesticide Chemical Search
                  </ExternalLink>
                  .
                </li>
                <li>
                  Additional information on inert ingredients can be found by
                  searching the{" "}
                  <ExternalLink href={externalLinks.inertIngredientFinder}>
                    EPA's Inert Ingredient Finder
                  </ExternalLink>
                  .
                </li>
                <li>
                  Information on tolerances and exemptions for pesticide
                  chemical residues in food can be found in{" "}
                  <ExternalLink href={externalLinks.cfr180}>
                    40 CFR 180
                  </ExternalLink>{" "}
                  and on this{" "}
                  <ExternalLink href={externalLinks.tolerancesEPA}>
                    EPA webpage
                  </ExternalLink>
                  .
                </li>
              </ul>
            </div>
          </div>

          {/* Questions */}
          <div id="questions" className="scroll-mt-28">
            <h1 className="font-bold text-primary">
              Questions about Minimum Risk Pesticides?
            </h1>
            <div className="mb-8 text-lg">
              <ul className="mt-3 ml-6 list-disc">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:pesticidequestions@epa.gov"
                    className="text-primary text-underline"
                  >
                    pesticidequestions@epa.gov
                  </a>
                </li>
                <li>
                  <ExternalLink href="https://www.epa.gov/minimum-risk-pesticides/forms/contact-us-about-minimum-risk-pesticides">
                    Complete the comment request form on EPA's website
                  </ExternalLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
