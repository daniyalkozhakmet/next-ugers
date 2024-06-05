import mongoose, { CallbackError } from "mongoose";
import Res from "./Res";
export interface IClaim extends Document {
  claim_number: string;
}
const { Schema } = mongoose;
export enum NEIGHBORHOOD {
  ALATAU = "Алатауский",
  ALMALY = "Алмалинский",
  AUEZOV = "Ауэзовский",
  BOSTANDYK = "Бостандыкский",
  ZHETYSU = "Жетысуский",
  MEDEU = "Медеуский",
  NAURYZBAI = "Наурызбайский",
  TURKSIB = "Турксибский",
}
export enum STREET_TYPE {
  MAGISTRAL = "Магистральная",
  RAION = "Районная",
}
const claimSchema = new Schema(
  {
    claim_number: {
      type: String,
      unique: false,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    date_of_excavation: {
      type: Date,
      required: false,
    },
    date_of_sending: {
      type: Date,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
    date_of_fixing: {
      type: Date,
      required: false,
    },
    date_of_obtaing_fail: {
      type: Date,
      required: false,
    },
    date_of_sending_claim_by_obtaining_fail: {
      type: Date,
      required: false,
    },
    date_of_signing: {
      type: Date,
      required: false,
    },
    date_recovery_ABP: {
      type: Date,
      required: false,
    },
    govern: {
      type: Boolean,
      default: false,
      required: true,
    },
    image1: {
      type: String,
      required: false,
    },
    image2: {
      type: String,
      required: false,
    },
    image3: {
      type: String,
      required: false,
    },
    image4: {
      type: String,
      required: false,
    },
    image5: {
      type: String,
      required: false,
    },
    image6: {
      type: String,
      required: false,
    },
    image7: {
      type: String,
      required: false,
    },
    invent_num: {
      type: String,
      required: true,
    },
    neighborhood: {
      type: String,
      enum: Object.values(NEIGHBORHOOD),
      required: true,
    },
    open_square: {
      type: String,
      required: true,
    },
    square_restored_area: {
      type: String,
      required: false,
    },
    street_type: {
      type: String,
      enum: Object.values(STREET_TYPE),
      required: true,
    },
    type_of_work: {
      type: String,
      required: true,
    },
    res: {
      type: Schema.Types.ObjectId,
      ref: "Res",
      required: true,
    },
  },
  { timestamps: true }
);

// claimSchema.pre("save", async function (next) {
//   console.log("PRE SAVE !!!!!!!!!!!!!!!!!!!!");

//   if (this.isNew) {
//     console.log("NEW");
//     // Only set claim_number if it's a new document
//     try {
//       const resDoc = await Res.findById(this.res);
//       if (resDoc) {
//         // Assuming you want to set the claim_number based on res's name
//         this.claim_number = `${resDoc.name}-${Date.now()}`;
//       }
//     } catch (error) {
//       return next(error as CallbackError | undefined);
//     }
//   }
//   next();
// });

export default mongoose.models.Claim ||
  mongoose.model<IClaim>("Claim", claimSchema);
