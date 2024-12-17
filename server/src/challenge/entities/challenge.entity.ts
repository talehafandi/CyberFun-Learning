import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema()
export class Option extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  description: string;
}

export const OptionSchema = SchemaFactory.createForClass(Option);

@Schema()
export class Outcome extends Document {
  @Prop({ type: Object }) // Equivalent to Mongoose's `Schema.Types.Mixed`
  options: Record<string, any>;
}

export const OutcomeSchema = SchemaFactory.createForClass(Outcome);

@Schema()
export class Scene extends Document {
  @Prop({ required: true })
  description: string;

  @Prop({ type: OutcomeSchema }) // Nesting the Outcome schema
  outcome: Outcome;
}

export const SceneSchema = SchemaFactory.createForClass(Scene);

@Schema()
export class Challenge extends Document {
    @Prop({ required: true })
    name: String;

    @Prop({ required: true })
    desctription: String;

    @Prop({type: OptionSchema})
    options: Option[];

    @Prop({ type: OutcomeSchema })
    outcome: Outcome;

    @Prop({ type: Map, of: SceneSchema })
    scenes: Map<string, Scene>;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);