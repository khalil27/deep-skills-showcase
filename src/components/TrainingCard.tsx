import { Link } from "react-router-dom";
import { Clock, Users } from "lucide-react";
import { Training } from "@/data/trainings";
import { Button } from "@/components/ui/button";

interface TrainingCardProps {
  training: Training;
}

const TrainingCard = ({ training }: TrainingCardProps) => {
  return (
    <div className="group">
      <div className="relative h-full bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-colors">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={training.image || "/placeholder.svg"}
            alt={training.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
              <Users size={16} className="text-primary" />
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
              className="w-full border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Voir plus
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainingCard;
