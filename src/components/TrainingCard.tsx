import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Monitor, Users } from "lucide-react";
import { Training } from "@/data/trainings";
import { Button } from "@/components/ui/button";

interface TrainingCardProps {
  training: Training;
  index: number;
}

const TrainingCard = ({ training, index }: TrainingCardProps) => {
  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "Online":
        return <Monitor size={16} />;
      case "Présentiel":
        return <Users size={16} />;
      default:
        return <Monitor size={16} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative h-full bg-card rounded-xl border border-border overflow-hidden card-hover">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={training.image || "/placeholder.svg"}
            alt={training.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-medium rounded-full gradient-bg text-primary-foreground">
              {training.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
            {training.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {training.shortDescription}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-primary" />
              <span>{training.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {getModeIcon(training.mode)}
              <span>{training.mode}</span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6 p-3 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-lg font-bold text-primary">{training.price} DT</p>
          </div>

          {/* CTA */}
          <Link to={`/formation/${training.id}`}>
            <Button 
              variant="outline" 
              className="w-full border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Voir plus
            </Button>
          </Link>
        </div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};

export default TrainingCard;
