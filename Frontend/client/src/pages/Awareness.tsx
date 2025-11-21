import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import wasteSortingImg from "@assets/waste sorting_1763738027579.jpg";
import wastePracticeImg from "@assets/waste practice_1763738010499.jpg";
import environmentalImpactImg from "@assets/environmental impact_1763737989464.jpg";

const columns = [
  {
    image: wasteSortingImg,
    title: "Essential waste sorting",
    content: [
      "Recyclables (paper, cardboard, plastics, glass, metals)",
      "Organic Waste (food scraps, garden waste)",
      "General Waste (non-recyclable household items)",
      "Hazardous Waste (batteries, chemicals, paint, e-waste)",
      "",
      "Properly separating waste materials is crucial, as it improves recycling efficiency, reduces landfill pressure, and ensures hazardous items are handled safely.",
    ],
  },
  {
    image: wastePracticeImg,
    title: "Practices for waste management",
    sections: [
      {
        icon: "♻️",
        title: "Reuse",
        items: [
          "Repurpose containers and bags",
          "Repair items before replacing",
          "Donate usable clothes and goods",
        ],
      },
      {
        icon: "♻️",
        title: "Reduce",
        items: [
          "Avoid single-use items",
          "Buy products with less packaging",
          "Reduce food waste through meal planning",
        ],
      },
      {
        icon: "♻️",
        title: "Recycle",
        items: [
          "Sort and clean recyclables",
          "Follow local recycling rules",
          "Drop off e-waste at approved centres",
          "Participate in community recycling drives",
        ],
      },
    ],
  },
  {
    image: environmentalImpactImg,
    title: "Environmental Sustainable Impact",
    sections: [
      {
        icon: "⚠️",
        title: "Consequences of Poor Waste Management",
        items: [
          "Pollution of land, water, and air",
          "Increased pests and health risks",
          "Overflowing landfills and bad odours",
        ],
      },
      {
        icon: "✅",
        title: "Benefits of Proper Waste Management",
        items: [
          "Cleaner, safer communities",
          "Reduced environmental impact",
          "More efficient recycling and resource use",
        ],
      },
    ],
  },
];

export default function Awareness() {
  return (
    <div className="space-y-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center">
        Our pledge to protect the city
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {columns.map((column, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <Card className="h-full hover-elevate transition-transform hover:scale-[1.02]">
              <CardContent className="p-6 space-y-4">
                <div className="aspect-video rounded-md overflow-hidden">
                  <img
                    src={column.image}
                    alt={column.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-primary">{column.title}</h3>

                {column.content && (
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {column.content.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                )}

                {column.sections && (
                  <div className="space-y-4">
                    {column.sections.map((section, i) => (
                      <div key={i} className="space-y-2">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span>{section.icon}</span>
                          <span>{section.title}</span>
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                          {section.items.map((item, j) => (
                            <li key={j}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
