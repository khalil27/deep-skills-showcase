import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import TrainingCard from "@/components/TrainingCard";
import { trainings } from "@/data/trainings";

const Formations = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Nos <span className="gradient-text">Formations</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explorez notre catalogue de formations tech de qualité, 
              conçues pour propulser votre carrière.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainings.map((training, index) => (
              <TrainingCard key={training.id} training={training} index={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Formations;
