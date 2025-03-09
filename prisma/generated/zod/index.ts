import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const UserScalarFieldEnumSchema = z.enum(['id','username','created_at','updated_at','biography']);

export const SpellbookScalarFieldEnumSchema = z.enum(['id','spellbook_name','character_name','spellbook_description','image_url','created_at','updated_at','user_id','spell_ids','class_ids','race_ids']);

export const SpellScalarFieldEnumSchema = z.enum(['id','index','name','url','desc','higher_level','range','components','material','ritual','duration','concentration','casting_time','level','attack_type','damage','spellbook_ids']);

export const ClassScalarFieldEnumSchema = z.enum(['id','index','name','url','hit_die','class_levels','spells','proficiency_ids','spellbook_ids']);

export const RaceScalarFieldEnumSchema = z.enum(['id','index','name','url','speed','alignment','age','size','size_description','language_desc','spellbook_ids']);

export const AbilityScoreScalarFieldEnumSchema = z.enum(['id','index','name','url','full_name','desc']);

export const SkillScalarFieldEnumSchema = z.enum(['id','index','name','url','desc']);

export const LanguageScalarFieldEnumSchema = z.enum(['id','index','name','url','type','typical_speakers','script']);

export const ProficiencyScalarFieldEnumSchema = z.enum(['id','index','name','url','type','race_ids','class_ids']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const ComponentsSchema = z.enum(['V','S','M']);

export type ComponentsType = `${z.infer<typeof ComponentsSchema>}`

export const AOETypeSchema = z.enum(['sphere','cone','cylinder','line','cube']);

export type AOETypeType = `${z.infer<typeof AOETypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().nullable(),
  biography: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SPELLBOOK SCHEMA
/////////////////////////////////////////

export const SpellbookSchema = z.object({
  id: z.string(),
  spellbook_name: z.string(),
  character_name: z.string(),
  spellbook_description: z.string().nullable(),
  image_url: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().nullable(),
  user_id: z.string(),
  spell_ids: z.string().array(),
  class_ids: z.string().array(),
  race_ids: z.string().array(),
})

export type Spellbook = z.infer<typeof SpellbookSchema>

/////////////////////////////////////////
// SPELL SCHEMA
/////////////////////////////////////////

export const SpellSchema = z.object({
  components: ComponentsSchema.array(),
  id: z.string(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  desc: z.string().array(),
  higher_level: z.string().array(),
  range: z.string(),
  material: z.string().nullable(),
  ritual: z.boolean(),
  duration: z.string(),
  concentration: z.boolean(),
  casting_time: z.string(),
  level: z.number().int(),
  attack_type: z.string().nullable(),
  damage: JsonValueSchema.nullable(),
  spellbook_ids: z.string().array(),
})

export type Spell = z.infer<typeof SpellSchema>

/////////////////////////////////////////
// CLASS SCHEMA
/////////////////////////////////////////

export const ClassSchema = z.object({
  id: z.string(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  hit_die: z.number().int(),
  class_levels: z.string(),
  spells: z.string().nullable(),
  proficiency_ids: z.string().array(),
  spellbook_ids: z.string().array(),
})

export type Class = z.infer<typeof ClassSchema>

/////////////////////////////////////////
// RACE SCHEMA
/////////////////////////////////////////

export const RaceSchema = z.object({
  id: z.string(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  speed: z.number().int(),
  alignment: z.string(),
  age: z.string(),
  size: z.string(),
  size_description: z.string(),
  language_desc: z.string(),
  spellbook_ids: z.string().array(),
})

export type Race = z.infer<typeof RaceSchema>

/////////////////////////////////////////
// ABILITY SCORE SCHEMA
/////////////////////////////////////////

export const AbilityScoreSchema = z.object({
  id: z.string(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  full_name: z.string(),
  desc: z.string().array(),
})

export type AbilityScore = z.infer<typeof AbilityScoreSchema>

/////////////////////////////////////////
// SKILL SCHEMA
/////////////////////////////////////////

export const SkillSchema = z.object({
  id: z.string(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  desc: z.string().array(),
})

export type Skill = z.infer<typeof SkillSchema>

/////////////////////////////////////////
// LANGUAGE SCHEMA
/////////////////////////////////////////

export const LanguageSchema = z.object({
  id: z.string(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  type: z.string(),
  typical_speakers: z.string().array(),
  script: z.string(),
})

export type Language = z.infer<typeof LanguageSchema>

/////////////////////////////////////////
// PROFICIENCY SCHEMA
/////////////////////////////////////////

export const ProficiencySchema = z.object({
  id: z.string(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  type: z.string(),
  race_ids: z.string().array(),
  class_ids: z.string().array(),
})

export type Proficiency = z.infer<typeof ProficiencySchema>

/////////////////////////////////////////
// COMPOSITE TYPES
/////////////////////////////////////////
// DIFFICULTY CLASS
//------------------------------------------------------


/////////////////////////////////////////
// DIFFICULTY CLASS SCHEMA
/////////////////////////////////////////

export const DifficultyClassSchema = z.object({
  dc_success: z.string(),
  desc: z.string().nullable(),
})

export type DifficultyClass = z.infer<typeof DifficultyClassSchema>
// CHOICE
//------------------------------------------------------


/////////////////////////////////////////
// CHOICE SCHEMA
/////////////////////////////////////////

export const ChoiceSchema = z.object({
  desc: z.string().nullable(),
  choose: z.number().int().nullable(),
  type: z.string().nullable(),
  from: JsonValueSchema.nullable(),
})

export type Choice = z.infer<typeof ChoiceSchema>
// AREA OF EFFECT
//------------------------------------------------------


/////////////////////////////////////////
// AREA OF EFFECT SCHEMA
/////////////////////////////////////////

export const AreaOfEffectSchema = z.object({
  type: AOETypeSchema,
  size: z.number().int(),
})

export type AreaOfEffect = z.infer<typeof AreaOfEffectSchema>
// STARTING EQUIPMENT
//------------------------------------------------------


/////////////////////////////////////////
// STARTING EQUIPMENT SCHEMA
/////////////////////////////////////////

export const StartingEquipmentSchema = z.object({
  quantity: z.number().int(),
})

export type StartingEquipment = z.infer<typeof StartingEquipmentSchema>
// PREREQUISITE
//------------------------------------------------------


/////////////////////////////////////////
// PREREQUISITE SCHEMA
/////////////////////////////////////////

export const PrerequisiteSchema = z.object({
  minimum_score: z.number().int().nullable(),
})

export type Prerequisite = z.infer<typeof PrerequisiteSchema>
// INFO
//------------------------------------------------------


/////////////////////////////////////////
// INFO SCHEMA
/////////////////////////////////////////

export const InfoSchema = z.object({
  name: z.string(),
  description: z.string().array(),
})

export type Info = z.infer<typeof InfoSchema>
// SPELLCASTING
//------------------------------------------------------


/////////////////////////////////////////
// SPELLCASTING SCHEMA
/////////////////////////////////////////

export const SpellcastingSchema = z.object({
  level: z.number().int(),
  spells: z.string(),
})

export type Spellcasting = z.infer<typeof SpellcastingSchema>
// MULTICLASSING
//------------------------------------------------------


/////////////////////////////////////////
// MULTICLASSING SCHEMA
/////////////////////////////////////////

export const MulticlassingSchema = z.object({
  prerequisite_options: JsonValueSchema.nullable(),
})

export type Multiclassing = z.infer<typeof MulticlassingSchema>
// CHARACTER ABILITY SCORE
//------------------------------------------------------


/////////////////////////////////////////
// CHARACTER ABILITY SCORE SCHEMA
/////////////////////////////////////////

export const CharacterAbilityScoreSchema = z.object({
  type: z.string(),
  value: z.number().int(),
})

export type CharacterAbilityScore = z.infer<typeof CharacterAbilityScoreSchema>
// ABILITY BONUS
//------------------------------------------------------


/////////////////////////////////////////
// ABILITY BONUS SCHEMA
/////////////////////////////////////////

export const AbilityBonusSchema = z.object({
  bonus: z.number().int(),
})

export type AbilityBonus = z.infer<typeof AbilityBonusSchema>
// DEATH SAVE
//------------------------------------------------------


/////////////////////////////////////////
// DEATH SAVE SCHEMA
/////////////////////////////////////////

export const DeathSaveSchema = z.object({
  successes: z.number().int(),
  failures: z.number().int(),
})

export type DeathSave = z.infer<typeof DeathSaveSchema>
// API REFERENCE
//------------------------------------------------------


/////////////////////////////////////////
// API REFERENCE SCHEMA
/////////////////////////////////////////

export const APIReferenceSchema = z.object({
  index: z.string(),
  name: z.string(),
  url: z.string(),
})

export type APIReference = z.infer<typeof APIReferenceSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  spellbooks: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  username: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  biography: z.boolean().optional(),
  spellbooks: z.union([z.boolean(),z.lazy(() => SpellbookArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SPELLBOOK
//------------------------------------------------------

export const SpellbookIncludeSchema: z.ZodType<Prisma.SpellbookInclude> = z.object({
}).strict()

export const SpellbookArgsSchema: z.ZodType<Prisma.SpellbookDefaultArgs> = z.object({
  select: z.lazy(() => SpellbookSelectSchema).optional(),
  include: z.lazy(() => SpellbookIncludeSchema).optional(),
}).strict();

export const SpellbookCountOutputTypeArgsSchema: z.ZodType<Prisma.SpellbookCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => SpellbookCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SpellbookCountOutputTypeSelectSchema: z.ZodType<Prisma.SpellbookCountOutputTypeSelect> = z.object({
  spells: z.boolean().optional(),
  classes: z.boolean().optional(),
  races: z.boolean().optional(),
}).strict();

export const SpellbookSelectSchema: z.ZodType<Prisma.SpellbookSelect> = z.object({
  id: z.boolean().optional(),
  spellbook_name: z.boolean().optional(),
  character_name: z.boolean().optional(),
  spellbook_description: z.boolean().optional(),
  image_url: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  user_id: z.boolean().optional(),
  spell_ids: z.boolean().optional(),
  class_ids: z.boolean().optional(),
  race_ids: z.boolean().optional(),
  auth_user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  spells: z.union([z.boolean(),z.lazy(() => SpellArgsSchema)]).optional(),
  classes: z.union([z.boolean(),z.lazy(() => ClassArgsSchema)]).optional(),
  races: z.union([z.boolean(),z.lazy(() => RaceArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SpellbookCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SPELL
//------------------------------------------------------

export const SpellIncludeSchema: z.ZodType<Prisma.SpellInclude> = z.object({
}).strict()

export const SpellArgsSchema: z.ZodType<Prisma.SpellDefaultArgs> = z.object({
  select: z.lazy(() => SpellSelectSchema).optional(),
  include: z.lazy(() => SpellIncludeSchema).optional(),
}).strict();

export const SpellCountOutputTypeArgsSchema: z.ZodType<Prisma.SpellCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => SpellCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SpellCountOutputTypeSelectSchema: z.ZodType<Prisma.SpellCountOutputTypeSelect> = z.object({
  classes: z.boolean().optional(),
  subclasses: z.boolean().optional(),
  spellbooks: z.boolean().optional(),
}).strict();

export const SpellSelectSchema: z.ZodType<Prisma.SpellSelect> = z.object({
  id: z.boolean().optional(),
  index: z.boolean().optional(),
  name: z.boolean().optional(),
  url: z.boolean().optional(),
  desc: z.boolean().optional(),
  higher_level: z.boolean().optional(),
  range: z.boolean().optional(),
  components: z.boolean().optional(),
  material: z.boolean().optional(),
  area_of_effect: z.union([z.boolean(),z.lazy(() => AreaOfEffectArgsSchema)]).optional(),
  ritual: z.boolean().optional(),
  duration: z.boolean().optional(),
  concentration: z.boolean().optional(),
  casting_time: z.boolean().optional(),
  level: z.boolean().optional(),
  attack_type: z.boolean().optional(),
  damage: z.boolean().optional(),
  dc: z.union([z.boolean(),z.lazy(() => DifficultyClassArgsSchema)]).optional(),
  school: z.union([z.boolean(),z.lazy(() => APIReferenceArgsSchema)]).optional(),
  classes: z.union([z.boolean(),z.lazy(() => APIReferenceArgsSchema)]).optional(),
  subclasses: z.union([z.boolean(),z.lazy(() => APIReferenceArgsSchema)]).optional(),
  spellbook_ids: z.boolean().optional(),
  spellbooks: z.union([z.boolean(),z.lazy(() => SpellbookArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SpellCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CLASS
//------------------------------------------------------

export const ClassIncludeSchema: z.ZodType<Prisma.ClassInclude> = z.object({
}).strict()

export const ClassArgsSchema: z.ZodType<Prisma.ClassDefaultArgs> = z.object({
  select: z.lazy(() => ClassSelectSchema).optional(),
  include: z.lazy(() => ClassIncludeSchema).optional(),
}).strict();

export const ClassCountOutputTypeArgsSchema: z.ZodType<Prisma.ClassCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ClassCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ClassCountOutputTypeSelectSchema: z.ZodType<Prisma.ClassCountOutputTypeSelect> = z.object({
  starting_equipment: z.boolean().optional(),
  starting_equipment_options: z.boolean().optional(),
  proficiency_choices: z.boolean().optional(),
  saving_throws: z.boolean().optional(),
  subclasses: z.boolean().optional(),
  proficiencies: z.boolean().optional(),
  spellbooks: z.boolean().optional(),
}).strict();

export const ClassSelectSchema: z.ZodType<Prisma.ClassSelect> = z.object({
  id: z.boolean().optional(),
  index: z.boolean().optional(),
  name: z.boolean().optional(),
  url: z.boolean().optional(),
  hit_die: z.boolean().optional(),
  class_levels: z.boolean().optional(),
  multi_classing: z.union([z.boolean(),z.lazy(() => MulticlassingArgsSchema)]).optional(),
  spells: z.boolean().optional(),
  starting_equipment: z.union([z.boolean(),z.lazy(() => StartingEquipmentArgsSchema)]).optional(),
  starting_equipment_options: z.union([z.boolean(),z.lazy(() => ChoiceArgsSchema)]).optional(),
  proficiency_ids: z.boolean().optional(),
  proficiency_choices: z.union([z.boolean(),z.lazy(() => ChoiceArgsSchema)]).optional(),
  saving_throws: z.union([z.boolean(),z.lazy(() => APIReferenceArgsSchema)]).optional(),
  subclasses: z.union([z.boolean(),z.lazy(() => APIReferenceArgsSchema)]).optional(),
  spellbook_ids: z.boolean().optional(),
  proficiencies: z.union([z.boolean(),z.lazy(() => ProficiencyArgsSchema)]).optional(),
  spellbooks: z.union([z.boolean(),z.lazy(() => SpellbookArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ClassCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RACE
//------------------------------------------------------

export const RaceIncludeSchema: z.ZodType<Prisma.RaceInclude> = z.object({
}).strict()

export const RaceArgsSchema: z.ZodType<Prisma.RaceDefaultArgs> = z.object({
  select: z.lazy(() => RaceSelectSchema).optional(),
  include: z.lazy(() => RaceIncludeSchema).optional(),
}).strict();

export const RaceCountOutputTypeArgsSchema: z.ZodType<Prisma.RaceCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RaceCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RaceCountOutputTypeSelectSchema: z.ZodType<Prisma.RaceCountOutputTypeSelect> = z.object({
  ability_bonuses: z.boolean().optional(),
  starting_proficiencies: z.boolean().optional(),
  languages: z.boolean().optional(),
  traits: z.boolean().optional(),
  subraces: z.boolean().optional(),
  spellbooks: z.boolean().optional(),
}).strict();

export const RaceSelectSchema: z.ZodType<Prisma.RaceSelect> = z.object({
  id: z.boolean().optional(),
  index: z.boolean().optional(),
  name: z.boolean().optional(),
  url: z.boolean().optional(),
  speed: z.boolean().optional(),
  ability_bonuses: z.union([z.boolean(),z.lazy(() => AbilityBonusArgsSchema)]).optional(),
  alignment: z.boolean().optional(),
  age: z.boolean().optional(),
  size: z.boolean().optional(),
  size_description: z.boolean().optional(),
  starting_proficiencies: z.union([z.boolean(),z.lazy(() => APIReferenceArgsSchema)]).optional(),
  starting_proficiency_options: z.union([z.boolean(),z.lazy(() => ChoiceArgsSchema)]).optional(),
  languages: z.union([z.boolean(),z.lazy(() => APIReferenceArgsSchema)]).optional(),
  language_desc: z.boolean().optional(),
  traits: z.union([z.boolean(),z.lazy(() => APIReferenceArgsSchema)]).optional(),
  subraces: z.union([z.boolean(),z.lazy(() => APIReferenceArgsSchema)]).optional(),
  spellbook_ids: z.boolean().optional(),
  spellbooks: z.union([z.boolean(),z.lazy(() => SpellbookArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RaceCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ABILITY SCORE
//------------------------------------------------------

export const AbilityScoreIncludeSchema: z.ZodType<Prisma.AbilityScoreInclude> = z.object({
}).strict()

export const AbilityScoreArgsSchema: z.ZodType<Prisma.AbilityScoreDefaultArgs> = z.object({
  select: z.lazy(() => AbilityScoreSelectSchema).optional(),
  include: z.lazy(() => AbilityScoreIncludeSchema).optional(),
}).strict();

export const AbilityScoreSelectSchema: z.ZodType<Prisma.AbilityScoreSelect> = z.object({
  id: z.boolean().optional(),
  index: z.boolean().optional(),
  name: z.boolean().optional(),
  url: z.boolean().optional(),
  full_name: z.boolean().optional(),
  desc: z.boolean().optional(),
  skills: z.union([z.boolean(),z.lazy(() => APIReferenceArgsSchema)]).optional(),
}).strict()

// SKILL
//------------------------------------------------------

export const SkillIncludeSchema: z.ZodType<Prisma.SkillInclude> = z.object({
}).strict()

export const SkillArgsSchema: z.ZodType<Prisma.SkillDefaultArgs> = z.object({
  select: z.lazy(() => SkillSelectSchema).optional(),
  include: z.lazy(() => SkillIncludeSchema).optional(),
}).strict();

export const SkillSelectSchema: z.ZodType<Prisma.SkillSelect> = z.object({
  id: z.boolean().optional(),
  index: z.boolean().optional(),
  name: z.boolean().optional(),
  url: z.boolean().optional(),
  desc: z.boolean().optional(),
  ability_score: z.union([z.boolean(),z.lazy(() => APIReferenceArgsSchema)]).optional(),
}).strict()

// LANGUAGE
//------------------------------------------------------

export const LanguageArgsSchema: z.ZodType<Prisma.LanguageDefaultArgs> = z.object({
  select: z.lazy(() => LanguageSelectSchema).optional(),
}).strict();

export const LanguageSelectSchema: z.ZodType<Prisma.LanguageSelect> = z.object({
  id: z.boolean().optional(),
  index: z.boolean().optional(),
  name: z.boolean().optional(),
  url: z.boolean().optional(),
  type: z.boolean().optional(),
  typical_speakers: z.boolean().optional(),
  script: z.boolean().optional(),
}).strict()

// PROFICIENCY
//------------------------------------------------------

export const ProficiencyIncludeSchema: z.ZodType<Prisma.ProficiencyInclude> = z.object({
}).strict()

export const ProficiencyArgsSchema: z.ZodType<Prisma.ProficiencyDefaultArgs> = z.object({
  select: z.lazy(() => ProficiencySelectSchema).optional(),
  include: z.lazy(() => ProficiencyIncludeSchema).optional(),
}).strict();

export const ProficiencyCountOutputTypeArgsSchema: z.ZodType<Prisma.ProficiencyCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProficiencyCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProficiencyCountOutputTypeSelectSchema: z.ZodType<Prisma.ProficiencyCountOutputTypeSelect> = z.object({
  classes: z.boolean().optional(),
}).strict();

export const ProficiencySelectSchema: z.ZodType<Prisma.ProficiencySelect> = z.object({
  id: z.boolean().optional(),
  index: z.boolean().optional(),
  name: z.boolean().optional(),
  url: z.boolean().optional(),
  type: z.boolean().optional(),
  race_ids: z.boolean().optional(),
  reference: z.union([z.boolean(),z.lazy(() => APIReferenceArgsSchema)]).optional(),
  class_ids: z.boolean().optional(),
  classes: z.union([z.boolean(),z.lazy(() => ClassArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProficiencyCountOutputTypeArgsSchema)]).optional(),
}).strict()

// AREA OF EFFECT
//------------------------------------------------------

export const AreaOfEffectArgsSchema: z.ZodType<Prisma.AreaOfEffectDefaultArgs> = z.object({
  select: z.lazy(() => AreaOfEffectSelectSchema).optional(),
}).strict();

export const AreaOfEffectSelectSchema: z.ZodType<Prisma.AreaOfEffectSelect> = z.object({
  size: z.boolean().optional(),
  type: z.boolean().optional(),
}).strict()

// DIFFICULTY CLASS
//------------------------------------------------------

export const DifficultyClassIncludeSchema: z.ZodType<Prisma.DifficultyClassInclude> = z.object({
}).strict()

export const DifficultyClassArgsSchema: z.ZodType<Prisma.DifficultyClassDefaultArgs> = z.object({
  select: z.lazy(() => DifficultyClassSelectSchema).optional(),
  include: z.lazy(() => DifficultyClassIncludeSchema).optional(),
}).strict();

export const DifficultyClassSelectSchema: z.ZodType<Prisma.DifficultyClassSelect> = z.object({
  dc_success: z.boolean().optional(),
  dc_type: z.union([z.boolean(),z.lazy(() => APIReferenceArgsSchema)]).optional(),
  desc: z.boolean().optional(),
}).strict()

// API REFERENCE
//------------------------------------------------------

export const APIReferenceArgsSchema: z.ZodType<Prisma.APIReferenceDefaultArgs> = z.object({
  select: z.lazy(() => APIReferenceSelectSchema).optional(),
}).strict();

export const APIReferenceSelectSchema: z.ZodType<Prisma.APIReferenceSelect> = z.object({
  index: z.boolean().optional(),
  name: z.boolean().optional(),
  url: z.boolean().optional(),
}).strict()

// MULTICLASSING
//------------------------------------------------------

export const MulticlassingIncludeSchema: z.ZodType<Prisma.MulticlassingInclude> = z.object({
}).strict()

export const MulticlassingArgsSchema: z.ZodType<Prisma.MulticlassingDefaultArgs> = z.object({
  select: z.lazy(() => MulticlassingSelectSchema).optional(),
  include: z.lazy(() => MulticlassingIncludeSchema).optional(),
}).strict();

export const MulticlassingSelectSchema: z.ZodType<Prisma.MulticlassingSelect> = z.object({
  prerequisites: z.union([z.boolean(),z.lazy(() => PrerequisiteArgsSchema)]).optional(),
  prerequisite_options: z.boolean().optional(),
  proficiencies: z.union([z.boolean(),z.lazy(() => APIReferenceArgsSchema)]).optional(),
  proficiency_choices: z.union([z.boolean(),z.lazy(() => ChoiceArgsSchema)]).optional(),
}).strict()

// STARTING EQUIPMENT
//------------------------------------------------------

export const StartingEquipmentIncludeSchema: z.ZodType<Prisma.StartingEquipmentInclude> = z.object({
}).strict()

export const StartingEquipmentArgsSchema: z.ZodType<Prisma.StartingEquipmentDefaultArgs> = z.object({
  select: z.lazy(() => StartingEquipmentSelectSchema).optional(),
  include: z.lazy(() => StartingEquipmentIncludeSchema).optional(),
}).strict();

export const StartingEquipmentSelectSchema: z.ZodType<Prisma.StartingEquipmentSelect> = z.object({
  quantity: z.boolean().optional(),
  equipment: z.union([z.boolean(),z.lazy(() => APIReferenceArgsSchema)]).optional(),
}).strict()

// CHOICE
//------------------------------------------------------

export const ChoiceArgsSchema: z.ZodType<Prisma.ChoiceDefaultArgs> = z.object({
  select: z.lazy(() => ChoiceSelectSchema).optional(),
}).strict();

export const ChoiceSelectSchema: z.ZodType<Prisma.ChoiceSelect> = z.object({
  desc: z.boolean().optional(),
  choose: z.boolean().optional(),
  type: z.boolean().optional(),
  from: z.boolean().optional(),
}).strict()

// ABILITY BONUS
//------------------------------------------------------

export const AbilityBonusIncludeSchema: z.ZodType<Prisma.AbilityBonusInclude> = z.object({
}).strict()

export const AbilityBonusArgsSchema: z.ZodType<Prisma.AbilityBonusDefaultArgs> = z.object({
  select: z.lazy(() => AbilityBonusSelectSchema).optional(),
  include: z.lazy(() => AbilityBonusIncludeSchema).optional(),
}).strict();

export const AbilityBonusSelectSchema: z.ZodType<Prisma.AbilityBonusSelect> = z.object({
  bonus: z.boolean().optional(),
  ability_score: z.union([z.boolean(),z.lazy(() => APIReferenceArgsSchema)]).optional(),
}).strict()

// PREREQUISITE
//------------------------------------------------------

export const PrerequisiteIncludeSchema: z.ZodType<Prisma.PrerequisiteInclude> = z.object({
}).strict()

export const PrerequisiteArgsSchema: z.ZodType<Prisma.PrerequisiteDefaultArgs> = z.object({
  select: z.lazy(() => PrerequisiteSelectSchema).optional(),
  include: z.lazy(() => PrerequisiteIncludeSchema).optional(),
}).strict();

export const PrerequisiteSelectSchema: z.ZodType<Prisma.PrerequisiteSelect> = z.object({
  ability_score: z.union([z.boolean(),z.lazy(() => APIReferenceArgsSchema)]).optional(),
  minimum_score: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  biography: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  spellbooks: z.lazy(() => SpellbookListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  biography: z.lazy(() => SortOrderSchema).optional(),
  spellbooks: z.lazy(() => SpellbookOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    username: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    username: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  username: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  biography: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  spellbooks: z.lazy(() => SpellbookListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  biography: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  biography: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SpellbookWhereInputSchema: z.ZodType<Prisma.SpellbookWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SpellbookWhereInputSchema),z.lazy(() => SpellbookWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpellbookWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpellbookWhereInputSchema),z.lazy(() => SpellbookWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  spellbook_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  character_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  spellbook_description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  spell_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  class_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  race_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  auth_user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  spells: z.lazy(() => SpellListRelationFilterSchema).optional(),
  classes: z.lazy(() => ClassListRelationFilterSchema).optional(),
  races: z.lazy(() => RaceListRelationFilterSchema).optional()
}).strict();

export const SpellbookOrderByWithRelationInputSchema: z.ZodType<Prisma.SpellbookOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  spellbook_name: z.lazy(() => SortOrderSchema).optional(),
  character_name: z.lazy(() => SortOrderSchema).optional(),
  spellbook_description: z.lazy(() => SortOrderSchema).optional(),
  image_url: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  spell_ids: z.lazy(() => SortOrderSchema).optional(),
  class_ids: z.lazy(() => SortOrderSchema).optional(),
  race_ids: z.lazy(() => SortOrderSchema).optional(),
  auth_user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  spells: z.lazy(() => SpellOrderByRelationAggregateInputSchema).optional(),
  classes: z.lazy(() => ClassOrderByRelationAggregateInputSchema).optional(),
  races: z.lazy(() => RaceOrderByRelationAggregateInputSchema).optional()
}).strict();

export const SpellbookWhereUniqueInputSchema: z.ZodType<Prisma.SpellbookWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    spellbook_name: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    spellbook_name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  spellbook_name: z.string().optional(),
  AND: z.union([ z.lazy(() => SpellbookWhereInputSchema),z.lazy(() => SpellbookWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpellbookWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpellbookWhereInputSchema),z.lazy(() => SpellbookWhereInputSchema).array() ]).optional(),
  character_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  spellbook_description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  spell_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  class_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  race_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  auth_user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  spells: z.lazy(() => SpellListRelationFilterSchema).optional(),
  classes: z.lazy(() => ClassListRelationFilterSchema).optional(),
  races: z.lazy(() => RaceListRelationFilterSchema).optional()
}).strict());

export const SpellbookOrderByWithAggregationInputSchema: z.ZodType<Prisma.SpellbookOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  spellbook_name: z.lazy(() => SortOrderSchema).optional(),
  character_name: z.lazy(() => SortOrderSchema).optional(),
  spellbook_description: z.lazy(() => SortOrderSchema).optional(),
  image_url: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  spell_ids: z.lazy(() => SortOrderSchema).optional(),
  class_ids: z.lazy(() => SortOrderSchema).optional(),
  race_ids: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SpellbookCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SpellbookMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SpellbookMinOrderByAggregateInputSchema).optional()
}).strict();

export const SpellbookScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SpellbookScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SpellbookScalarWhereWithAggregatesInputSchema),z.lazy(() => SpellbookScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpellbookScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpellbookScalarWhereWithAggregatesInputSchema),z.lazy(() => SpellbookScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  spellbook_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  character_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  spellbook_description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  image_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  spell_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  class_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  race_ids: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const SpellWhereInputSchema: z.ZodType<Prisma.SpellWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SpellWhereInputSchema),z.lazy(() => SpellWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpellWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpellWhereInputSchema),z.lazy(() => SpellWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  desc: z.lazy(() => StringNullableListFilterSchema).optional(),
  higher_level: z.lazy(() => StringNullableListFilterSchema).optional(),
  range: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  components: z.lazy(() => EnumComponentsNullableListFilterSchema).optional(),
  material: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  area_of_effect: z.union([ z.lazy(() => AreaOfEffectNullableCompositeFilterSchema),z.lazy(() => AreaOfEffectObjectEqualityInputSchema) ]).optional().nullable(),
  ritual: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  duration: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  concentration: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  casting_time: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  level: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  attack_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  damage: z.lazy(() => JsonNullableFilterSchema).optional(),
  dc: z.union([ z.lazy(() => DifficultyClassNullableCompositeFilterSchema),z.lazy(() => DifficultyClassObjectEqualityInputSchema) ]).optional().nullable(),
  school: z.union([ z.lazy(() => APIReferenceCompositeFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema) ]).optional(),
  classes: z.union([ z.lazy(() => APIReferenceCompositeListFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceCompositeListFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema).array() ]).optional(),
  spellbook_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  spellbooks: z.lazy(() => SpellbookListRelationFilterSchema).optional()
}).strict();

export const SpellOrderByWithRelationInputSchema: z.ZodType<Prisma.SpellOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  desc: z.lazy(() => SortOrderSchema).optional(),
  higher_level: z.lazy(() => SortOrderSchema).optional(),
  range: z.lazy(() => SortOrderSchema).optional(),
  components: z.lazy(() => SortOrderSchema).optional(),
  material: z.lazy(() => SortOrderSchema).optional(),
  area_of_effect: z.lazy(() => AreaOfEffectOrderByInputSchema).optional(),
  ritual: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  concentration: z.lazy(() => SortOrderSchema).optional(),
  casting_time: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  attack_type: z.lazy(() => SortOrderSchema).optional(),
  damage: z.lazy(() => SortOrderSchema).optional(),
  dc: z.lazy(() => DifficultyClassOrderByInputSchema).optional(),
  school: z.lazy(() => APIReferenceOrderByInputSchema).optional(),
  classes: z.lazy(() => APIReferenceOrderByCompositeAggregateInputSchema).optional(),
  subclasses: z.lazy(() => APIReferenceOrderByCompositeAggregateInputSchema).optional(),
  spellbook_ids: z.lazy(() => SortOrderSchema).optional(),
  spellbooks: z.lazy(() => SpellbookOrderByRelationAggregateInputSchema).optional()
}).strict();

export const SpellWhereUniqueInputSchema: z.ZodType<Prisma.SpellWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => SpellWhereInputSchema),z.lazy(() => SpellWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpellWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpellWhereInputSchema),z.lazy(() => SpellWhereInputSchema).array() ]).optional(),
  index: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  desc: z.lazy(() => StringNullableListFilterSchema).optional(),
  higher_level: z.lazy(() => StringNullableListFilterSchema).optional(),
  range: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  components: z.lazy(() => EnumComponentsNullableListFilterSchema).optional(),
  material: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  area_of_effect: z.union([ z.lazy(() => AreaOfEffectNullableCompositeFilterSchema),z.lazy(() => AreaOfEffectObjectEqualityInputSchema) ]).optional().nullable(),
  ritual: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  duration: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  concentration: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  casting_time: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  level: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  attack_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  damage: z.lazy(() => JsonNullableFilterSchema).optional(),
  dc: z.union([ z.lazy(() => DifficultyClassNullableCompositeFilterSchema),z.lazy(() => DifficultyClassObjectEqualityInputSchema) ]).optional().nullable(),
  school: z.union([ z.lazy(() => APIReferenceCompositeFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema) ]).optional(),
  classes: z.union([ z.lazy(() => APIReferenceCompositeListFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceCompositeListFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema).array() ]).optional(),
  spellbook_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  spellbooks: z.lazy(() => SpellbookListRelationFilterSchema).optional()
}).strict());

export const SpellOrderByWithAggregationInputSchema: z.ZodType<Prisma.SpellOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  desc: z.lazy(() => SortOrderSchema).optional(),
  higher_level: z.lazy(() => SortOrderSchema).optional(),
  range: z.lazy(() => SortOrderSchema).optional(),
  components: z.lazy(() => SortOrderSchema).optional(),
  material: z.lazy(() => SortOrderSchema).optional(),
  ritual: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  concentration: z.lazy(() => SortOrderSchema).optional(),
  casting_time: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  attack_type: z.lazy(() => SortOrderSchema).optional(),
  damage: z.lazy(() => SortOrderSchema).optional(),
  spellbook_ids: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SpellCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SpellAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SpellMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SpellMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SpellSumOrderByAggregateInputSchema).optional()
}).strict();

export const SpellScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SpellScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SpellScalarWhereWithAggregatesInputSchema),z.lazy(() => SpellScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpellScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpellScalarWhereWithAggregatesInputSchema),z.lazy(() => SpellScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  desc: z.lazy(() => StringNullableListFilterSchema).optional(),
  higher_level: z.lazy(() => StringNullableListFilterSchema).optional(),
  range: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  components: z.lazy(() => EnumComponentsNullableListFilterSchema).optional(),
  material: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  ritual: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  duration: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  concentration: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  casting_time: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  level: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  attack_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  damage: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  spellbook_ids: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const ClassWhereInputSchema: z.ZodType<Prisma.ClassWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ClassWhereInputSchema),z.lazy(() => ClassWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClassWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClassWhereInputSchema),z.lazy(() => ClassWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hit_die: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  class_levels: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  multi_classing: z.union([ z.lazy(() => MulticlassingNullableCompositeFilterSchema),z.lazy(() => MulticlassingObjectEqualityInputSchema) ]).optional().nullable(),
  spells: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  starting_equipment: z.union([ z.lazy(() => StartingEquipmentCompositeListFilterSchema),z.lazy(() => StartingEquipmentObjectEqualityInputSchema).array() ]).optional(),
  starting_equipment_options: z.union([ z.lazy(() => ChoiceCompositeListFilterSchema),z.lazy(() => ChoiceObjectEqualityInputSchema).array() ]).optional(),
  proficiency_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceCompositeListFilterSchema),z.lazy(() => ChoiceObjectEqualityInputSchema).array() ]).optional(),
  saving_throws: z.union([ z.lazy(() => APIReferenceCompositeListFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceCompositeListFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema).array() ]).optional(),
  spellbook_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  proficiencies: z.lazy(() => ProficiencyListRelationFilterSchema).optional(),
  spellbooks: z.lazy(() => SpellbookListRelationFilterSchema).optional()
}).strict();

export const ClassOrderByWithRelationInputSchema: z.ZodType<Prisma.ClassOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  hit_die: z.lazy(() => SortOrderSchema).optional(),
  class_levels: z.lazy(() => SortOrderSchema).optional(),
  multi_classing: z.lazy(() => MulticlassingOrderByInputSchema).optional(),
  spells: z.lazy(() => SortOrderSchema).optional(),
  starting_equipment: z.lazy(() => StartingEquipmentOrderByCompositeAggregateInputSchema).optional(),
  starting_equipment_options: z.lazy(() => ChoiceOrderByCompositeAggregateInputSchema).optional(),
  proficiency_ids: z.lazy(() => SortOrderSchema).optional(),
  proficiency_choices: z.lazy(() => ChoiceOrderByCompositeAggregateInputSchema).optional(),
  saving_throws: z.lazy(() => APIReferenceOrderByCompositeAggregateInputSchema).optional(),
  subclasses: z.lazy(() => APIReferenceOrderByCompositeAggregateInputSchema).optional(),
  spellbook_ids: z.lazy(() => SortOrderSchema).optional(),
  proficiencies: z.lazy(() => ProficiencyOrderByRelationAggregateInputSchema).optional(),
  spellbooks: z.lazy(() => SpellbookOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ClassWhereUniqueInputSchema: z.ZodType<Prisma.ClassWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    index: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
    index: z.string(),
  }),
  z.object({
    id: z.string(),
    name: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    index: z.string(),
    name: z.string(),
  }),
  z.object({
    index: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  index: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => ClassWhereInputSchema),z.lazy(() => ClassWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClassWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClassWhereInputSchema),z.lazy(() => ClassWhereInputSchema).array() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hit_die: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  class_levels: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  multi_classing: z.union([ z.lazy(() => MulticlassingNullableCompositeFilterSchema),z.lazy(() => MulticlassingObjectEqualityInputSchema) ]).optional().nullable(),
  spells: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  starting_equipment: z.union([ z.lazy(() => StartingEquipmentCompositeListFilterSchema),z.lazy(() => StartingEquipmentObjectEqualityInputSchema).array() ]).optional(),
  starting_equipment_options: z.union([ z.lazy(() => ChoiceCompositeListFilterSchema),z.lazy(() => ChoiceObjectEqualityInputSchema).array() ]).optional(),
  proficiency_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceCompositeListFilterSchema),z.lazy(() => ChoiceObjectEqualityInputSchema).array() ]).optional(),
  saving_throws: z.union([ z.lazy(() => APIReferenceCompositeListFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceCompositeListFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema).array() ]).optional(),
  spellbook_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  proficiencies: z.lazy(() => ProficiencyListRelationFilterSchema).optional(),
  spellbooks: z.lazy(() => SpellbookListRelationFilterSchema).optional()
}).strict());

export const ClassOrderByWithAggregationInputSchema: z.ZodType<Prisma.ClassOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  hit_die: z.lazy(() => SortOrderSchema).optional(),
  class_levels: z.lazy(() => SortOrderSchema).optional(),
  spells: z.lazy(() => SortOrderSchema).optional(),
  proficiency_ids: z.lazy(() => SortOrderSchema).optional(),
  spellbook_ids: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ClassCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ClassAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ClassMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ClassMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ClassSumOrderByAggregateInputSchema).optional()
}).strict();

export const ClassScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ClassScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ClassScalarWhereWithAggregatesInputSchema),z.lazy(() => ClassScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClassScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClassScalarWhereWithAggregatesInputSchema),z.lazy(() => ClassScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hit_die: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  class_levels: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  spells: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  proficiency_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  spellbook_ids: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const RaceWhereInputSchema: z.ZodType<Prisma.RaceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RaceWhereInputSchema),z.lazy(() => RaceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RaceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RaceWhereInputSchema),z.lazy(() => RaceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  speed: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ability_bonuses: z.union([ z.lazy(() => AbilityBonusCompositeListFilterSchema),z.lazy(() => AbilityBonusObjectEqualityInputSchema).array() ]).optional(),
  alignment: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  age: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size_description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  starting_proficiencies: z.union([ z.lazy(() => APIReferenceCompositeListFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema).array() ]).optional(),
  starting_proficiency_options: z.union([ z.lazy(() => ChoiceNullableCompositeFilterSchema),z.lazy(() => ChoiceObjectEqualityInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => APIReferenceCompositeListFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema).array() ]).optional(),
  language_desc: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  traits: z.union([ z.lazy(() => APIReferenceCompositeListFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema).array() ]).optional(),
  subraces: z.union([ z.lazy(() => APIReferenceCompositeListFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema).array() ]).optional(),
  spellbook_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  spellbooks: z.lazy(() => SpellbookListRelationFilterSchema).optional()
}).strict();

export const RaceOrderByWithRelationInputSchema: z.ZodType<Prisma.RaceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  speed: z.lazy(() => SortOrderSchema).optional(),
  ability_bonuses: z.lazy(() => AbilityBonusOrderByCompositeAggregateInputSchema).optional(),
  alignment: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  size_description: z.lazy(() => SortOrderSchema).optional(),
  starting_proficiencies: z.lazy(() => APIReferenceOrderByCompositeAggregateInputSchema).optional(),
  starting_proficiency_options: z.lazy(() => ChoiceOrderByInputSchema).optional(),
  languages: z.lazy(() => APIReferenceOrderByCompositeAggregateInputSchema).optional(),
  language_desc: z.lazy(() => SortOrderSchema).optional(),
  traits: z.lazy(() => APIReferenceOrderByCompositeAggregateInputSchema).optional(),
  subraces: z.lazy(() => APIReferenceOrderByCompositeAggregateInputSchema).optional(),
  spellbook_ids: z.lazy(() => SortOrderSchema).optional(),
  spellbooks: z.lazy(() => SpellbookOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RaceWhereUniqueInputSchema: z.ZodType<Prisma.RaceWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    index: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
    index: z.string(),
  }),
  z.object({
    id: z.string(),
    name: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    index: z.string(),
    name: z.string(),
  }),
  z.object({
    index: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  index: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => RaceWhereInputSchema),z.lazy(() => RaceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RaceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RaceWhereInputSchema),z.lazy(() => RaceWhereInputSchema).array() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  speed: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  ability_bonuses: z.union([ z.lazy(() => AbilityBonusCompositeListFilterSchema),z.lazy(() => AbilityBonusObjectEqualityInputSchema).array() ]).optional(),
  alignment: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  age: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size_description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  starting_proficiencies: z.union([ z.lazy(() => APIReferenceCompositeListFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema).array() ]).optional(),
  starting_proficiency_options: z.union([ z.lazy(() => ChoiceNullableCompositeFilterSchema),z.lazy(() => ChoiceObjectEqualityInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => APIReferenceCompositeListFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema).array() ]).optional(),
  language_desc: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  traits: z.union([ z.lazy(() => APIReferenceCompositeListFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema).array() ]).optional(),
  subraces: z.union([ z.lazy(() => APIReferenceCompositeListFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema).array() ]).optional(),
  spellbook_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  spellbooks: z.lazy(() => SpellbookListRelationFilterSchema).optional()
}).strict());

export const RaceOrderByWithAggregationInputSchema: z.ZodType<Prisma.RaceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  speed: z.lazy(() => SortOrderSchema).optional(),
  alignment: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  size_description: z.lazy(() => SortOrderSchema).optional(),
  language_desc: z.lazy(() => SortOrderSchema).optional(),
  spellbook_ids: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RaceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RaceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RaceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RaceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RaceSumOrderByAggregateInputSchema).optional()
}).strict();

export const RaceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RaceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RaceScalarWhereWithAggregatesInputSchema),z.lazy(() => RaceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RaceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RaceScalarWhereWithAggregatesInputSchema),z.lazy(() => RaceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  speed: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  alignment: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  age: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  size_description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  language_desc: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  spellbook_ids: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const AbilityScoreWhereInputSchema: z.ZodType<Prisma.AbilityScoreWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AbilityScoreWhereInputSchema),z.lazy(() => AbilityScoreWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AbilityScoreWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AbilityScoreWhereInputSchema),z.lazy(() => AbilityScoreWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  full_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  desc: z.lazy(() => StringNullableListFilterSchema).optional(),
  skills: z.union([ z.lazy(() => APIReferenceCompositeListFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema).array() ]).optional(),
}).strict();

export const AbilityScoreOrderByWithRelationInputSchema: z.ZodType<Prisma.AbilityScoreOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  desc: z.lazy(() => SortOrderSchema).optional(),
  skills: z.lazy(() => APIReferenceOrderByCompositeAggregateInputSchema).optional()
}).strict();

export const AbilityScoreWhereUniqueInputSchema: z.ZodType<Prisma.AbilityScoreWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => AbilityScoreWhereInputSchema),z.lazy(() => AbilityScoreWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AbilityScoreWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AbilityScoreWhereInputSchema),z.lazy(() => AbilityScoreWhereInputSchema).array() ]).optional(),
  index: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  full_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  desc: z.lazy(() => StringNullableListFilterSchema).optional(),
  skills: z.union([ z.lazy(() => APIReferenceCompositeListFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema).array() ]).optional(),
}).strict());

export const AbilityScoreOrderByWithAggregationInputSchema: z.ZodType<Prisma.AbilityScoreOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  desc: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AbilityScoreCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AbilityScoreMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AbilityScoreMinOrderByAggregateInputSchema).optional()
}).strict();

export const AbilityScoreScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AbilityScoreScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AbilityScoreScalarWhereWithAggregatesInputSchema),z.lazy(() => AbilityScoreScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AbilityScoreScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AbilityScoreScalarWhereWithAggregatesInputSchema),z.lazy(() => AbilityScoreScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  full_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  desc: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const SkillWhereInputSchema: z.ZodType<Prisma.SkillWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SkillWhereInputSchema),z.lazy(() => SkillWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SkillWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SkillWhereInputSchema),z.lazy(() => SkillWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  desc: z.lazy(() => StringNullableListFilterSchema).optional(),
  ability_score: z.union([ z.lazy(() => APIReferenceCompositeFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema) ]).optional(),
}).strict();

export const SkillOrderByWithRelationInputSchema: z.ZodType<Prisma.SkillOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  desc: z.lazy(() => SortOrderSchema).optional(),
  ability_score: z.lazy(() => APIReferenceOrderByInputSchema).optional()
}).strict();

export const SkillWhereUniqueInputSchema: z.ZodType<Prisma.SkillWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => SkillWhereInputSchema),z.lazy(() => SkillWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SkillWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SkillWhereInputSchema),z.lazy(() => SkillWhereInputSchema).array() ]).optional(),
  index: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  desc: z.lazy(() => StringNullableListFilterSchema).optional(),
  ability_score: z.union([ z.lazy(() => APIReferenceCompositeFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema) ]).optional(),
}).strict());

export const SkillOrderByWithAggregationInputSchema: z.ZodType<Prisma.SkillOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  desc: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SkillCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SkillMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SkillMinOrderByAggregateInputSchema).optional()
}).strict();

export const SkillScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SkillScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SkillScalarWhereWithAggregatesInputSchema),z.lazy(() => SkillScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SkillScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SkillScalarWhereWithAggregatesInputSchema),z.lazy(() => SkillScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  desc: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const LanguageWhereInputSchema: z.ZodType<Prisma.LanguageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LanguageWhereInputSchema),z.lazy(() => LanguageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LanguageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LanguageWhereInputSchema),z.lazy(() => LanguageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  typical_speakers: z.lazy(() => StringNullableListFilterSchema).optional(),
  script: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const LanguageOrderByWithRelationInputSchema: z.ZodType<Prisma.LanguageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  typical_speakers: z.lazy(() => SortOrderSchema).optional(),
  script: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LanguageWhereUniqueInputSchema: z.ZodType<Prisma.LanguageWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => LanguageWhereInputSchema),z.lazy(() => LanguageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LanguageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LanguageWhereInputSchema),z.lazy(() => LanguageWhereInputSchema).array() ]).optional(),
  index: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  typical_speakers: z.lazy(() => StringNullableListFilterSchema).optional(),
  script: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict());

export const LanguageOrderByWithAggregationInputSchema: z.ZodType<Prisma.LanguageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  typical_speakers: z.lazy(() => SortOrderSchema).optional(),
  script: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LanguageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LanguageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LanguageMinOrderByAggregateInputSchema).optional()
}).strict();

export const LanguageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LanguageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LanguageScalarWhereWithAggregatesInputSchema),z.lazy(() => LanguageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LanguageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LanguageScalarWhereWithAggregatesInputSchema),z.lazy(() => LanguageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  typical_speakers: z.lazy(() => StringNullableListFilterSchema).optional(),
  script: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ProficiencyWhereInputSchema: z.ZodType<Prisma.ProficiencyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProficiencyWhereInputSchema),z.lazy(() => ProficiencyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProficiencyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProficiencyWhereInputSchema),z.lazy(() => ProficiencyWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  race_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  reference: z.union([ z.lazy(() => APIReferenceCompositeFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema) ]).optional(),
  class_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  classes: z.lazy(() => ClassListRelationFilterSchema).optional()
}).strict();

export const ProficiencyOrderByWithRelationInputSchema: z.ZodType<Prisma.ProficiencyOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  race_ids: z.lazy(() => SortOrderSchema).optional(),
  reference: z.lazy(() => APIReferenceOrderByInputSchema).optional(),
  class_ids: z.lazy(() => SortOrderSchema).optional(),
  classes: z.lazy(() => ClassOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ProficiencyWhereUniqueInputSchema: z.ZodType<Prisma.ProficiencyWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ProficiencyWhereInputSchema),z.lazy(() => ProficiencyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProficiencyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProficiencyWhereInputSchema),z.lazy(() => ProficiencyWhereInputSchema).array() ]).optional(),
  index: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  race_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  reference: z.union([ z.lazy(() => APIReferenceCompositeFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema) ]).optional(),
  class_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  classes: z.lazy(() => ClassListRelationFilterSchema).optional()
}).strict());

export const ProficiencyOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProficiencyOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  race_ids: z.lazy(() => SortOrderSchema).optional(),
  class_ids: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProficiencyCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProficiencyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProficiencyMinOrderByAggregateInputSchema).optional()
}).strict();

export const ProficiencyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProficiencyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProficiencyScalarWhereWithAggregatesInputSchema),z.lazy(() => ProficiencyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProficiencyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProficiencyScalarWhereWithAggregatesInputSchema),z.lazy(() => ProficiencyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  race_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  class_ids: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().optional(),
  username: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  biography: z.string().optional().nullable(),
  spellbooks: z.lazy(() => SpellbookCreateNestedManyWithoutAuth_userInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  username: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  biography: z.string().optional().nullable(),
  spellbooks: z.lazy(() => SpellbookUncheckedCreateNestedManyWithoutAuth_userInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  biography: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spellbooks: z.lazy(() => SpellbookUpdateManyWithoutAuth_userNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  biography: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spellbooks: z.lazy(() => SpellbookUncheckedUpdateManyWithoutAuth_userNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().optional(),
  username: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  biography: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  biography: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  biography: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SpellbookCreateInputSchema: z.ZodType<Prisma.SpellbookCreateInput> = z.object({
  id: z.string().optional(),
  spellbook_name: z.string(),
  character_name: z.string(),
  spellbook_description: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  auth_user: z.lazy(() => UserCreateNestedOneWithoutSpellbooksInputSchema),
  spells: z.lazy(() => SpellCreateNestedManyWithoutSpellbooksInputSchema).optional(),
  classes: z.lazy(() => ClassCreateNestedManyWithoutSpellbooksInputSchema).optional(),
  races: z.lazy(() => RaceCreateNestedManyWithoutSpellbooksInputSchema).optional()
}).strict();

export const SpellbookUncheckedCreateInputSchema: z.ZodType<Prisma.SpellbookUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  spellbook_name: z.string(),
  character_name: z.string(),
  spellbook_description: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  user_id: z.string(),
  spell_ids: z.union([ z.lazy(() => SpellbookCreatespell_idsInputSchema),z.string().array() ]).optional(),
  class_ids: z.union([ z.lazy(() => SpellbookCreateclass_idsInputSchema),z.string().array() ]).optional(),
  race_ids: z.union([ z.lazy(() => SpellbookCreaterace_idsInputSchema),z.string().array() ]).optional(),
  spells: z.lazy(() => SpellUncheckedCreateNestedManyWithoutSpellbooksInputSchema).optional(),
  classes: z.lazy(() => ClassUncheckedCreateNestedManyWithoutSpellbooksInputSchema).optional(),
  races: z.lazy(() => RaceUncheckedCreateNestedManyWithoutSpellbooksInputSchema).optional()
}).strict();

export const SpellbookUpdateInputSchema: z.ZodType<Prisma.SpellbookUpdateInput> = z.object({
  spellbook_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spellbook_description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_user: z.lazy(() => UserUpdateOneRequiredWithoutSpellbooksNestedInputSchema).optional(),
  spells: z.lazy(() => SpellUpdateManyWithoutSpellbooksNestedInputSchema).optional(),
  classes: z.lazy(() => ClassUpdateManyWithoutSpellbooksNestedInputSchema).optional(),
  races: z.lazy(() => RaceUpdateManyWithoutSpellbooksNestedInputSchema).optional()
}).strict();

export const SpellbookUncheckedUpdateInputSchema: z.ZodType<Prisma.SpellbookUncheckedUpdateInput> = z.object({
  spellbook_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spellbook_description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spell_ids: z.union([ z.lazy(() => SpellbookUpdatespell_idsInputSchema),z.string().array() ]).optional(),
  class_ids: z.union([ z.lazy(() => SpellbookUpdateclass_idsInputSchema),z.string().array() ]).optional(),
  race_ids: z.union([ z.lazy(() => SpellbookUpdaterace_idsInputSchema),z.string().array() ]).optional(),
  spells: z.lazy(() => SpellUncheckedUpdateManyWithoutSpellbooksNestedInputSchema).optional(),
  classes: z.lazy(() => ClassUncheckedUpdateManyWithoutSpellbooksNestedInputSchema).optional(),
  races: z.lazy(() => RaceUncheckedUpdateManyWithoutSpellbooksNestedInputSchema).optional()
}).strict();

export const SpellbookCreateManyInputSchema: z.ZodType<Prisma.SpellbookCreateManyInput> = z.object({
  id: z.string().optional(),
  spellbook_name: z.string(),
  character_name: z.string(),
  spellbook_description: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  user_id: z.string(),
  spell_ids: z.union([ z.lazy(() => SpellbookCreatespell_idsInputSchema),z.string().array() ]).optional(),
  class_ids: z.union([ z.lazy(() => SpellbookCreateclass_idsInputSchema),z.string().array() ]).optional(),
  race_ids: z.union([ z.lazy(() => SpellbookCreaterace_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const SpellbookUpdateManyMutationInputSchema: z.ZodType<Prisma.SpellbookUpdateManyMutationInput> = z.object({
  spellbook_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spellbook_description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SpellbookUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SpellbookUncheckedUpdateManyInput> = z.object({
  spellbook_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spellbook_description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spell_ids: z.union([ z.lazy(() => SpellbookUpdatespell_idsInputSchema),z.string().array() ]).optional(),
  class_ids: z.union([ z.lazy(() => SpellbookUpdateclass_idsInputSchema),z.string().array() ]).optional(),
  race_ids: z.union([ z.lazy(() => SpellbookUpdaterace_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const SpellCreateInputSchema: z.ZodType<Prisma.SpellCreateInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  desc: z.union([ z.lazy(() => SpellCreatedescInputSchema),z.string().array() ]).optional(),
  higher_level: z.union([ z.lazy(() => SpellCreatehigher_levelInputSchema),z.string().array() ]).optional(),
  range: z.string(),
  components: z.union([ z.lazy(() => SpellCreatecomponentsInputSchema),z.lazy(() => ComponentsSchema).array() ]).optional(),
  material: z.string().optional().nullable(),
  area_of_effect: z.union([ z.lazy(() => AreaOfEffectNullableCreateEnvelopeInputSchema),z.lazy(() => AreaOfEffectCreateInputSchema) ]).optional().nullable(),
  ritual: z.boolean(),
  duration: z.string(),
  concentration: z.boolean(),
  casting_time: z.string(),
  level: z.number().int(),
  attack_type: z.string().optional().nullable(),
  damage: InputJsonValueSchema.optional().nullable(),
  dc: z.union([ z.lazy(() => DifficultyClassNullableCreateEnvelopeInputSchema),z.lazy(() => DifficultyClassCreateInputSchema) ]).optional().nullable(),
  school: z.union([ z.lazy(() => APIReferenceCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]),
  classes: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbooks: z.lazy(() => SpellbookCreateNestedManyWithoutSpellsInputSchema).optional()
}).strict();

export const SpellUncheckedCreateInputSchema: z.ZodType<Prisma.SpellUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  desc: z.union([ z.lazy(() => SpellCreatedescInputSchema),z.string().array() ]).optional(),
  higher_level: z.union([ z.lazy(() => SpellCreatehigher_levelInputSchema),z.string().array() ]).optional(),
  range: z.string(),
  components: z.union([ z.lazy(() => SpellCreatecomponentsInputSchema),z.lazy(() => ComponentsSchema).array() ]).optional(),
  material: z.string().optional().nullable(),
  area_of_effect: z.union([ z.lazy(() => AreaOfEffectNullableCreateEnvelopeInputSchema),z.lazy(() => AreaOfEffectCreateInputSchema) ]).optional().nullable(),
  ritual: z.boolean(),
  duration: z.string(),
  concentration: z.boolean(),
  casting_time: z.string(),
  level: z.number().int(),
  attack_type: z.string().optional().nullable(),
  damage: InputJsonValueSchema.optional().nullable(),
  dc: z.union([ z.lazy(() => DifficultyClassNullableCreateEnvelopeInputSchema),z.lazy(() => DifficultyClassCreateInputSchema) ]).optional().nullable(),
  school: z.union([ z.lazy(() => APIReferenceCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]),
  classes: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => SpellCreatespellbook_idsInputSchema),z.string().array() ]).optional(),
  spellbooks: z.lazy(() => SpellbookUncheckedCreateNestedManyWithoutSpellsInputSchema).optional()
}).strict();

export const SpellUpdateInputSchema: z.ZodType<Prisma.SpellUpdateInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.lazy(() => SpellUpdatedescInputSchema),z.string().array() ]).optional(),
  higher_level: z.union([ z.lazy(() => SpellUpdatehigher_levelInputSchema),z.string().array() ]).optional(),
  range: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  components: z.union([ z.lazy(() => SpellUpdatecomponentsInputSchema),z.lazy(() => ComponentsSchema).array() ]).optional(),
  material: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  area_of_effect: z.union([ z.lazy(() => AreaOfEffectNullableUpdateEnvelopeInputSchema),z.lazy(() => AreaOfEffectCreateInputSchema) ]).optional().nullable(),
  ritual: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  concentration: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  casting_time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  damage: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  dc: z.union([ z.lazy(() => DifficultyClassNullableUpdateEnvelopeInputSchema),z.lazy(() => DifficultyClassCreateInputSchema) ]).optional().nullable(),
  school: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
  classes: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbooks: z.lazy(() => SpellbookUpdateManyWithoutSpellsNestedInputSchema).optional()
}).strict();

export const SpellUncheckedUpdateInputSchema: z.ZodType<Prisma.SpellUncheckedUpdateInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.lazy(() => SpellUpdatedescInputSchema),z.string().array() ]).optional(),
  higher_level: z.union([ z.lazy(() => SpellUpdatehigher_levelInputSchema),z.string().array() ]).optional(),
  range: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  components: z.union([ z.lazy(() => SpellUpdatecomponentsInputSchema),z.lazy(() => ComponentsSchema).array() ]).optional(),
  material: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  area_of_effect: z.union([ z.lazy(() => AreaOfEffectNullableUpdateEnvelopeInputSchema),z.lazy(() => AreaOfEffectCreateInputSchema) ]).optional().nullable(),
  ritual: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  concentration: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  casting_time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  damage: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  dc: z.union([ z.lazy(() => DifficultyClassNullableUpdateEnvelopeInputSchema),z.lazy(() => DifficultyClassCreateInputSchema) ]).optional().nullable(),
  school: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
  classes: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => SpellUpdatespellbook_idsInputSchema),z.string().array() ]).optional(),
  spellbooks: z.lazy(() => SpellbookUncheckedUpdateManyWithoutSpellsNestedInputSchema).optional()
}).strict();

export const SpellCreateManyInputSchema: z.ZodType<Prisma.SpellCreateManyInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  desc: z.union([ z.lazy(() => SpellCreatedescInputSchema),z.string().array() ]).optional(),
  higher_level: z.union([ z.lazy(() => SpellCreatehigher_levelInputSchema),z.string().array() ]).optional(),
  range: z.string(),
  components: z.union([ z.lazy(() => SpellCreatecomponentsInputSchema),z.lazy(() => ComponentsSchema).array() ]).optional(),
  material: z.string().optional().nullable(),
  area_of_effect: z.union([ z.lazy(() => AreaOfEffectNullableCreateEnvelopeInputSchema),z.lazy(() => AreaOfEffectCreateInputSchema) ]).optional().nullable(),
  ritual: z.boolean(),
  duration: z.string(),
  concentration: z.boolean(),
  casting_time: z.string(),
  level: z.number().int(),
  attack_type: z.string().optional().nullable(),
  damage: InputJsonValueSchema.optional().nullable(),
  dc: z.union([ z.lazy(() => DifficultyClassNullableCreateEnvelopeInputSchema),z.lazy(() => DifficultyClassCreateInputSchema) ]).optional().nullable(),
  school: z.union([ z.lazy(() => APIReferenceCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]),
  classes: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => SpellCreatespellbook_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const SpellUpdateManyMutationInputSchema: z.ZodType<Prisma.SpellUpdateManyMutationInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.lazy(() => SpellUpdatedescInputSchema),z.string().array() ]).optional(),
  higher_level: z.union([ z.lazy(() => SpellUpdatehigher_levelInputSchema),z.string().array() ]).optional(),
  range: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  components: z.union([ z.lazy(() => SpellUpdatecomponentsInputSchema),z.lazy(() => ComponentsSchema).array() ]).optional(),
  material: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  area_of_effect: z.union([ z.lazy(() => AreaOfEffectNullableUpdateEnvelopeInputSchema),z.lazy(() => AreaOfEffectCreateInputSchema) ]).optional().nullable(),
  ritual: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  concentration: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  casting_time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  damage: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  dc: z.union([ z.lazy(() => DifficultyClassNullableUpdateEnvelopeInputSchema),z.lazy(() => DifficultyClassCreateInputSchema) ]).optional().nullable(),
  school: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
  classes: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
}).strict();

export const SpellUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SpellUncheckedUpdateManyInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.lazy(() => SpellUpdatedescInputSchema),z.string().array() ]).optional(),
  higher_level: z.union([ z.lazy(() => SpellUpdatehigher_levelInputSchema),z.string().array() ]).optional(),
  range: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  components: z.union([ z.lazy(() => SpellUpdatecomponentsInputSchema),z.lazy(() => ComponentsSchema).array() ]).optional(),
  material: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  area_of_effect: z.union([ z.lazy(() => AreaOfEffectNullableUpdateEnvelopeInputSchema),z.lazy(() => AreaOfEffectCreateInputSchema) ]).optional().nullable(),
  ritual: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  concentration: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  casting_time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  damage: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  dc: z.union([ z.lazy(() => DifficultyClassNullableUpdateEnvelopeInputSchema),z.lazy(() => DifficultyClassCreateInputSchema) ]).optional().nullable(),
  school: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
  classes: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => SpellUpdatespellbook_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const ClassCreateInputSchema: z.ZodType<Prisma.ClassCreateInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  hit_die: z.number().int(),
  class_levels: z.string(),
  multi_classing: z.union([ z.lazy(() => MulticlassingNullableCreateEnvelopeInputSchema),z.lazy(() => MulticlassingCreateInputSchema) ]).optional().nullable(),
  spells: z.string().optional().nullable(),
  starting_equipment: z.union([ z.lazy(() => StartingEquipmentListCreateEnvelopeInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema).array() ]).optional(),
  starting_equipment_options: z.union([ z.lazy(() => ChoiceListCreateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceListCreateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  saving_throws: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  proficiencies: z.lazy(() => ProficiencyCreateNestedManyWithoutClassesInputSchema).optional(),
  spellbooks: z.lazy(() => SpellbookCreateNestedManyWithoutClassesInputSchema).optional()
}).strict();

export const ClassUncheckedCreateInputSchema: z.ZodType<Prisma.ClassUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  hit_die: z.number().int(),
  class_levels: z.string(),
  multi_classing: z.union([ z.lazy(() => MulticlassingNullableCreateEnvelopeInputSchema),z.lazy(() => MulticlassingCreateInputSchema) ]).optional().nullable(),
  spells: z.string().optional().nullable(),
  starting_equipment: z.union([ z.lazy(() => StartingEquipmentListCreateEnvelopeInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema).array() ]).optional(),
  starting_equipment_options: z.union([ z.lazy(() => ChoiceListCreateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  proficiency_ids: z.union([ z.lazy(() => ClassCreateproficiency_idsInputSchema),z.string().array() ]).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceListCreateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  saving_throws: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => ClassCreatespellbook_idsInputSchema),z.string().array() ]).optional(),
  proficiencies: z.lazy(() => ProficiencyUncheckedCreateNestedManyWithoutClassesInputSchema).optional(),
  spellbooks: z.lazy(() => SpellbookUncheckedCreateNestedManyWithoutClassesInputSchema).optional()
}).strict();

export const ClassUpdateInputSchema: z.ZodType<Prisma.ClassUpdateInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hit_die: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  class_levels: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  multi_classing: z.union([ z.lazy(() => MulticlassingNullableUpdateEnvelopeInputSchema),z.lazy(() => MulticlassingCreateInputSchema) ]).optional().nullable(),
  spells: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  starting_equipment: z.union([ z.lazy(() => StartingEquipmentListUpdateEnvelopeInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema).array() ]).optional(),
  starting_equipment_options: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  saving_throws: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  proficiencies: z.lazy(() => ProficiencyUpdateManyWithoutClassesNestedInputSchema).optional(),
  spellbooks: z.lazy(() => SpellbookUpdateManyWithoutClassesNestedInputSchema).optional()
}).strict();

export const ClassUncheckedUpdateInputSchema: z.ZodType<Prisma.ClassUncheckedUpdateInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hit_die: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  class_levels: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  multi_classing: z.union([ z.lazy(() => MulticlassingNullableUpdateEnvelopeInputSchema),z.lazy(() => MulticlassingCreateInputSchema) ]).optional().nullable(),
  spells: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  starting_equipment: z.union([ z.lazy(() => StartingEquipmentListUpdateEnvelopeInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema).array() ]).optional(),
  starting_equipment_options: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  proficiency_ids: z.union([ z.lazy(() => ClassUpdateproficiency_idsInputSchema),z.string().array() ]).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  saving_throws: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => ClassUpdatespellbook_idsInputSchema),z.string().array() ]).optional(),
  proficiencies: z.lazy(() => ProficiencyUncheckedUpdateManyWithoutClassesNestedInputSchema).optional(),
  spellbooks: z.lazy(() => SpellbookUncheckedUpdateManyWithoutClassesNestedInputSchema).optional()
}).strict();

export const ClassCreateManyInputSchema: z.ZodType<Prisma.ClassCreateManyInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  hit_die: z.number().int(),
  class_levels: z.string(),
  multi_classing: z.union([ z.lazy(() => MulticlassingNullableCreateEnvelopeInputSchema),z.lazy(() => MulticlassingCreateInputSchema) ]).optional().nullable(),
  spells: z.string().optional().nullable(),
  starting_equipment: z.union([ z.lazy(() => StartingEquipmentListCreateEnvelopeInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema).array() ]).optional(),
  starting_equipment_options: z.union([ z.lazy(() => ChoiceListCreateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  proficiency_ids: z.union([ z.lazy(() => ClassCreateproficiency_idsInputSchema),z.string().array() ]).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceListCreateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  saving_throws: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => ClassCreatespellbook_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const ClassUpdateManyMutationInputSchema: z.ZodType<Prisma.ClassUpdateManyMutationInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hit_die: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  class_levels: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  multi_classing: z.union([ z.lazy(() => MulticlassingNullableUpdateEnvelopeInputSchema),z.lazy(() => MulticlassingCreateInputSchema) ]).optional().nullable(),
  spells: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  starting_equipment: z.union([ z.lazy(() => StartingEquipmentListUpdateEnvelopeInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema).array() ]).optional(),
  starting_equipment_options: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  saving_throws: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
}).strict();

export const ClassUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ClassUncheckedUpdateManyInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hit_die: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  class_levels: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  multi_classing: z.union([ z.lazy(() => MulticlassingNullableUpdateEnvelopeInputSchema),z.lazy(() => MulticlassingCreateInputSchema) ]).optional().nullable(),
  spells: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  starting_equipment: z.union([ z.lazy(() => StartingEquipmentListUpdateEnvelopeInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema).array() ]).optional(),
  starting_equipment_options: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  proficiency_ids: z.union([ z.lazy(() => ClassUpdateproficiency_idsInputSchema),z.string().array() ]).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  saving_throws: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => ClassUpdatespellbook_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const RaceCreateInputSchema: z.ZodType<Prisma.RaceCreateInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  speed: z.number().int(),
  ability_bonuses: z.union([ z.lazy(() => AbilityBonusListCreateEnvelopeInputSchema),z.lazy(() => AbilityBonusCreateInputSchema),z.lazy(() => AbilityBonusCreateInputSchema).array() ]).optional(),
  alignment: z.string(),
  age: z.string(),
  size: z.string(),
  size_description: z.string(),
  starting_proficiencies: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  starting_proficiency_options: z.union([ z.lazy(() => ChoiceNullableCreateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  language_desc: z.string(),
  traits: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subraces: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbooks: z.lazy(() => SpellbookCreateNestedManyWithoutRacesInputSchema).optional()
}).strict();

export const RaceUncheckedCreateInputSchema: z.ZodType<Prisma.RaceUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  speed: z.number().int(),
  ability_bonuses: z.union([ z.lazy(() => AbilityBonusListCreateEnvelopeInputSchema),z.lazy(() => AbilityBonusCreateInputSchema),z.lazy(() => AbilityBonusCreateInputSchema).array() ]).optional(),
  alignment: z.string(),
  age: z.string(),
  size: z.string(),
  size_description: z.string(),
  starting_proficiencies: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  starting_proficiency_options: z.union([ z.lazy(() => ChoiceNullableCreateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  language_desc: z.string(),
  traits: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subraces: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => RaceCreatespellbook_idsInputSchema),z.string().array() ]).optional(),
  spellbooks: z.lazy(() => SpellbookUncheckedCreateNestedManyWithoutRacesInputSchema).optional()
}).strict();

export const RaceUpdateInputSchema: z.ZodType<Prisma.RaceUpdateInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ability_bonuses: z.union([ z.lazy(() => AbilityBonusListUpdateEnvelopeInputSchema),z.lazy(() => AbilityBonusCreateInputSchema),z.lazy(() => AbilityBonusCreateInputSchema).array() ]).optional(),
  alignment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size_description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  starting_proficiencies: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  starting_proficiency_options: z.union([ z.lazy(() => ChoiceNullableUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  language_desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  traits: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subraces: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbooks: z.lazy(() => SpellbookUpdateManyWithoutRacesNestedInputSchema).optional()
}).strict();

export const RaceUncheckedUpdateInputSchema: z.ZodType<Prisma.RaceUncheckedUpdateInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ability_bonuses: z.union([ z.lazy(() => AbilityBonusListUpdateEnvelopeInputSchema),z.lazy(() => AbilityBonusCreateInputSchema),z.lazy(() => AbilityBonusCreateInputSchema).array() ]).optional(),
  alignment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size_description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  starting_proficiencies: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  starting_proficiency_options: z.union([ z.lazy(() => ChoiceNullableUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  language_desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  traits: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subraces: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => RaceUpdatespellbook_idsInputSchema),z.string().array() ]).optional(),
  spellbooks: z.lazy(() => SpellbookUncheckedUpdateManyWithoutRacesNestedInputSchema).optional()
}).strict();

export const RaceCreateManyInputSchema: z.ZodType<Prisma.RaceCreateManyInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  speed: z.number().int(),
  ability_bonuses: z.union([ z.lazy(() => AbilityBonusListCreateEnvelopeInputSchema),z.lazy(() => AbilityBonusCreateInputSchema),z.lazy(() => AbilityBonusCreateInputSchema).array() ]).optional(),
  alignment: z.string(),
  age: z.string(),
  size: z.string(),
  size_description: z.string(),
  starting_proficiencies: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  starting_proficiency_options: z.union([ z.lazy(() => ChoiceNullableCreateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  language_desc: z.string(),
  traits: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subraces: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => RaceCreatespellbook_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const RaceUpdateManyMutationInputSchema: z.ZodType<Prisma.RaceUpdateManyMutationInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ability_bonuses: z.union([ z.lazy(() => AbilityBonusListUpdateEnvelopeInputSchema),z.lazy(() => AbilityBonusCreateInputSchema),z.lazy(() => AbilityBonusCreateInputSchema).array() ]).optional(),
  alignment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size_description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  starting_proficiencies: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  starting_proficiency_options: z.union([ z.lazy(() => ChoiceNullableUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  language_desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  traits: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subraces: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
}).strict();

export const RaceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RaceUncheckedUpdateManyInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ability_bonuses: z.union([ z.lazy(() => AbilityBonusListUpdateEnvelopeInputSchema),z.lazy(() => AbilityBonusCreateInputSchema),z.lazy(() => AbilityBonusCreateInputSchema).array() ]).optional(),
  alignment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size_description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  starting_proficiencies: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  starting_proficiency_options: z.union([ z.lazy(() => ChoiceNullableUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  language_desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  traits: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subraces: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => RaceUpdatespellbook_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const AbilityScoreCreateInputSchema: z.ZodType<Prisma.AbilityScoreCreateInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  full_name: z.string(),
  desc: z.union([ z.lazy(() => AbilityScoreCreatedescInputSchema),z.string().array() ]).optional(),
  skills: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
}).strict();

export const AbilityScoreUncheckedCreateInputSchema: z.ZodType<Prisma.AbilityScoreUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  full_name: z.string(),
  desc: z.union([ z.lazy(() => AbilityScoreCreatedescInputSchema),z.string().array() ]).optional(),
  skills: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
}).strict();

export const AbilityScoreUpdateInputSchema: z.ZodType<Prisma.AbilityScoreUpdateInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.lazy(() => AbilityScoreUpdatedescInputSchema),z.string().array() ]).optional(),
  skills: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
}).strict();

export const AbilityScoreUncheckedUpdateInputSchema: z.ZodType<Prisma.AbilityScoreUncheckedUpdateInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.lazy(() => AbilityScoreUpdatedescInputSchema),z.string().array() ]).optional(),
  skills: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
}).strict();

export const AbilityScoreCreateManyInputSchema: z.ZodType<Prisma.AbilityScoreCreateManyInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  full_name: z.string(),
  desc: z.union([ z.lazy(() => AbilityScoreCreatedescInputSchema),z.string().array() ]).optional(),
  skills: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
}).strict();

export const AbilityScoreUpdateManyMutationInputSchema: z.ZodType<Prisma.AbilityScoreUpdateManyMutationInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.lazy(() => AbilityScoreUpdatedescInputSchema),z.string().array() ]).optional(),
  skills: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
}).strict();

export const AbilityScoreUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AbilityScoreUncheckedUpdateManyInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.lazy(() => AbilityScoreUpdatedescInputSchema),z.string().array() ]).optional(),
  skills: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
}).strict();

export const SkillCreateInputSchema: z.ZodType<Prisma.SkillCreateInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  desc: z.union([ z.lazy(() => SkillCreatedescInputSchema),z.string().array() ]).optional(),
  ability_score: z.union([ z.lazy(() => APIReferenceCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]),
}).strict();

export const SkillUncheckedCreateInputSchema: z.ZodType<Prisma.SkillUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  desc: z.union([ z.lazy(() => SkillCreatedescInputSchema),z.string().array() ]).optional(),
  ability_score: z.union([ z.lazy(() => APIReferenceCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]),
}).strict();

export const SkillUpdateInputSchema: z.ZodType<Prisma.SkillUpdateInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.lazy(() => SkillUpdatedescInputSchema),z.string().array() ]).optional(),
  ability_score: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
}).strict();

export const SkillUncheckedUpdateInputSchema: z.ZodType<Prisma.SkillUncheckedUpdateInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.lazy(() => SkillUpdatedescInputSchema),z.string().array() ]).optional(),
  ability_score: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
}).strict();

export const SkillCreateManyInputSchema: z.ZodType<Prisma.SkillCreateManyInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  desc: z.union([ z.lazy(() => SkillCreatedescInputSchema),z.string().array() ]).optional(),
  ability_score: z.union([ z.lazy(() => APIReferenceCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]),
}).strict();

export const SkillUpdateManyMutationInputSchema: z.ZodType<Prisma.SkillUpdateManyMutationInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.lazy(() => SkillUpdatedescInputSchema),z.string().array() ]).optional(),
  ability_score: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
}).strict();

export const SkillUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SkillUncheckedUpdateManyInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.lazy(() => SkillUpdatedescInputSchema),z.string().array() ]).optional(),
  ability_score: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
}).strict();

export const LanguageCreateInputSchema: z.ZodType<Prisma.LanguageCreateInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  type: z.string(),
  typical_speakers: z.union([ z.lazy(() => LanguageCreatetypical_speakersInputSchema),z.string().array() ]).optional(),
  script: z.string()
}).strict();

export const LanguageUncheckedCreateInputSchema: z.ZodType<Prisma.LanguageUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  type: z.string(),
  typical_speakers: z.union([ z.lazy(() => LanguageCreatetypical_speakersInputSchema),z.string().array() ]).optional(),
  script: z.string()
}).strict();

export const LanguageUpdateInputSchema: z.ZodType<Prisma.LanguageUpdateInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  typical_speakers: z.union([ z.lazy(() => LanguageUpdatetypical_speakersInputSchema),z.string().array() ]).optional(),
  script: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LanguageUncheckedUpdateInputSchema: z.ZodType<Prisma.LanguageUncheckedUpdateInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  typical_speakers: z.union([ z.lazy(() => LanguageUpdatetypical_speakersInputSchema),z.string().array() ]).optional(),
  script: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LanguageCreateManyInputSchema: z.ZodType<Prisma.LanguageCreateManyInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  type: z.string(),
  typical_speakers: z.union([ z.lazy(() => LanguageCreatetypical_speakersInputSchema),z.string().array() ]).optional(),
  script: z.string()
}).strict();

export const LanguageUpdateManyMutationInputSchema: z.ZodType<Prisma.LanguageUpdateManyMutationInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  typical_speakers: z.union([ z.lazy(() => LanguageUpdatetypical_speakersInputSchema),z.string().array() ]).optional(),
  script: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LanguageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LanguageUncheckedUpdateManyInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  typical_speakers: z.union([ z.lazy(() => LanguageUpdatetypical_speakersInputSchema),z.string().array() ]).optional(),
  script: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProficiencyCreateInputSchema: z.ZodType<Prisma.ProficiencyCreateInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  type: z.string(),
  race_ids: z.union([ z.lazy(() => ProficiencyCreaterace_idsInputSchema),z.string().array() ]).optional(),
  reference: z.union([ z.lazy(() => APIReferenceCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]),
  classes: z.lazy(() => ClassCreateNestedManyWithoutProficienciesInputSchema).optional()
}).strict();

export const ProficiencyUncheckedCreateInputSchema: z.ZodType<Prisma.ProficiencyUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  type: z.string(),
  race_ids: z.union([ z.lazy(() => ProficiencyCreaterace_idsInputSchema),z.string().array() ]).optional(),
  reference: z.union([ z.lazy(() => APIReferenceCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]),
  class_ids: z.union([ z.lazy(() => ProficiencyCreateclass_idsInputSchema),z.string().array() ]).optional(),
  classes: z.lazy(() => ClassUncheckedCreateNestedManyWithoutProficienciesInputSchema).optional()
}).strict();

export const ProficiencyUpdateInputSchema: z.ZodType<Prisma.ProficiencyUpdateInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  race_ids: z.union([ z.lazy(() => ProficiencyUpdaterace_idsInputSchema),z.string().array() ]).optional(),
  reference: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
  classes: z.lazy(() => ClassUpdateManyWithoutProficienciesNestedInputSchema).optional()
}).strict();

export const ProficiencyUncheckedUpdateInputSchema: z.ZodType<Prisma.ProficiencyUncheckedUpdateInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  race_ids: z.union([ z.lazy(() => ProficiencyUpdaterace_idsInputSchema),z.string().array() ]).optional(),
  reference: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
  class_ids: z.union([ z.lazy(() => ProficiencyUpdateclass_idsInputSchema),z.string().array() ]).optional(),
  classes: z.lazy(() => ClassUncheckedUpdateManyWithoutProficienciesNestedInputSchema).optional()
}).strict();

export const ProficiencyCreateManyInputSchema: z.ZodType<Prisma.ProficiencyCreateManyInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  type: z.string(),
  race_ids: z.union([ z.lazy(() => ProficiencyCreaterace_idsInputSchema),z.string().array() ]).optional(),
  reference: z.union([ z.lazy(() => APIReferenceCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]),
  class_ids: z.union([ z.lazy(() => ProficiencyCreateclass_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const ProficiencyUpdateManyMutationInputSchema: z.ZodType<Prisma.ProficiencyUpdateManyMutationInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  race_ids: z.union([ z.lazy(() => ProficiencyUpdaterace_idsInputSchema),z.string().array() ]).optional(),
  reference: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
}).strict();

export const ProficiencyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProficiencyUncheckedUpdateManyInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  race_ids: z.union([ z.lazy(() => ProficiencyUpdaterace_idsInputSchema),z.string().array() ]).optional(),
  reference: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
  class_ids: z.union([ z.lazy(() => ProficiencyUpdateclass_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const SpellbookListRelationFilterSchema: z.ZodType<Prisma.SpellbookListRelationFilter> = z.object({
  every: z.lazy(() => SpellbookWhereInputSchema).optional(),
  some: z.lazy(() => SpellbookWhereInputSchema).optional(),
  none: z.lazy(() => SpellbookWhereInputSchema).optional()
}).strict();

export const SpellbookOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SpellbookOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  biography: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  biography: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  biography: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SpellListRelationFilterSchema: z.ZodType<Prisma.SpellListRelationFilter> = z.object({
  every: z.lazy(() => SpellWhereInputSchema).optional(),
  some: z.lazy(() => SpellWhereInputSchema).optional(),
  none: z.lazy(() => SpellWhereInputSchema).optional()
}).strict();

export const ClassListRelationFilterSchema: z.ZodType<Prisma.ClassListRelationFilter> = z.object({
  every: z.lazy(() => ClassWhereInputSchema).optional(),
  some: z.lazy(() => ClassWhereInputSchema).optional(),
  none: z.lazy(() => ClassWhereInputSchema).optional()
}).strict();

export const RaceListRelationFilterSchema: z.ZodType<Prisma.RaceListRelationFilter> = z.object({
  every: z.lazy(() => RaceWhereInputSchema).optional(),
  some: z.lazy(() => RaceWhereInputSchema).optional(),
  none: z.lazy(() => RaceWhereInputSchema).optional()
}).strict();

export const SpellOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SpellOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClassOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ClassOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RaceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RaceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpellbookCountOrderByAggregateInputSchema: z.ZodType<Prisma.SpellbookCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  spellbook_name: z.lazy(() => SortOrderSchema).optional(),
  character_name: z.lazy(() => SortOrderSchema).optional(),
  spellbook_description: z.lazy(() => SortOrderSchema).optional(),
  image_url: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  spell_ids: z.lazy(() => SortOrderSchema).optional(),
  class_ids: z.lazy(() => SortOrderSchema).optional(),
  race_ids: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpellbookMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SpellbookMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  spellbook_name: z.lazy(() => SortOrderSchema).optional(),
  character_name: z.lazy(() => SortOrderSchema).optional(),
  spellbook_description: z.lazy(() => SortOrderSchema).optional(),
  image_url: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpellbookMinOrderByAggregateInputSchema: z.ZodType<Prisma.SpellbookMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  spellbook_name: z.lazy(() => SortOrderSchema).optional(),
  character_name: z.lazy(() => SortOrderSchema).optional(),
  spellbook_description: z.lazy(() => SortOrderSchema).optional(),
  image_url: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumComponentsNullableListFilterSchema: z.ZodType<Prisma.EnumComponentsNullableListFilter> = z.object({
  equals: z.lazy(() => ComponentsSchema).array().optional().nullable(),
  has: z.lazy(() => ComponentsSchema).optional().nullable(),
  hasEvery: z.lazy(() => ComponentsSchema).array().optional(),
  hasSome: z.lazy(() => ComponentsSchema).array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const AreaOfEffectNullableCompositeFilterSchema: z.ZodType<Prisma.AreaOfEffectNullableCompositeFilter> = z.object({
  equals: z.lazy(() => AreaOfEffectObjectEqualityInputSchema).optional().nullable(),
  is: z.lazy(() => AreaOfEffectWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AreaOfEffectWhereInputSchema).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const AreaOfEffectObjectEqualityInputSchema: z.ZodType<Prisma.AreaOfEffectObjectEqualityInput> = z.object({
  size: z.number(),
  type: z.lazy(() => AOETypeSchema)
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional().nullable(),
  not: InputJsonValueSchema.optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const DifficultyClassNullableCompositeFilterSchema: z.ZodType<Prisma.DifficultyClassNullableCompositeFilter> = z.object({
  equals: z.lazy(() => DifficultyClassObjectEqualityInputSchema).optional().nullable(),
  is: z.lazy(() => DifficultyClassWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => DifficultyClassWhereInputSchema).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const DifficultyClassObjectEqualityInputSchema: z.ZodType<Prisma.DifficultyClassObjectEqualityInput> = z.object({
  dc_success: z.string(),
  dc_type: z.lazy(() => APIReferenceObjectEqualityInputSchema),
  desc: z.string().optional().nullable()
}).strict();

export const APIReferenceCompositeFilterSchema: z.ZodType<Prisma.APIReferenceCompositeFilter> = z.object({
  equals: z.lazy(() => APIReferenceObjectEqualityInputSchema).optional(),
  is: z.lazy(() => APIReferenceWhereInputSchema).optional(),
  isNot: z.lazy(() => APIReferenceWhereInputSchema).optional()
}).strict();

export const APIReferenceObjectEqualityInputSchema: z.ZodType<Prisma.APIReferenceObjectEqualityInput> = z.object({
  index: z.string(),
  name: z.string(),
  url: z.string()
}).strict();

export const APIReferenceCompositeListFilterSchema: z.ZodType<Prisma.APIReferenceCompositeListFilter> = z.object({
  equals: z.lazy(() => APIReferenceObjectEqualityInputSchema).array().optional(),
  every: z.lazy(() => APIReferenceWhereInputSchema).optional(),
  some: z.lazy(() => APIReferenceWhereInputSchema).optional(),
  none: z.lazy(() => APIReferenceWhereInputSchema).optional(),
  isEmpty: z.boolean().optional(),
  isSet: z.boolean().optional()
}).strict();

export const AreaOfEffectOrderByInputSchema: z.ZodType<Prisma.AreaOfEffectOrderByInput> = z.object({
  size: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DifficultyClassOrderByInputSchema: z.ZodType<Prisma.DifficultyClassOrderByInput> = z.object({
  dc_success: z.lazy(() => SortOrderSchema).optional(),
  dc_type: z.lazy(() => APIReferenceOrderByInputSchema).optional(),
  desc: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const APIReferenceOrderByInputSchema: z.ZodType<Prisma.APIReferenceOrderByInput> = z.object({
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const APIReferenceOrderByCompositeAggregateInputSchema: z.ZodType<Prisma.APIReferenceOrderByCompositeAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpellCountOrderByAggregateInputSchema: z.ZodType<Prisma.SpellCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  desc: z.lazy(() => SortOrderSchema).optional(),
  higher_level: z.lazy(() => SortOrderSchema).optional(),
  range: z.lazy(() => SortOrderSchema).optional(),
  components: z.lazy(() => SortOrderSchema).optional(),
  material: z.lazy(() => SortOrderSchema).optional(),
  ritual: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  concentration: z.lazy(() => SortOrderSchema).optional(),
  casting_time: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  attack_type: z.lazy(() => SortOrderSchema).optional(),
  damage: z.lazy(() => SortOrderSchema).optional(),
  spellbook_ids: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpellAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SpellAvgOrderByAggregateInput> = z.object({
  level: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpellMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SpellMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  range: z.lazy(() => SortOrderSchema).optional(),
  material: z.lazy(() => SortOrderSchema).optional(),
  ritual: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  concentration: z.lazy(() => SortOrderSchema).optional(),
  casting_time: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  attack_type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpellMinOrderByAggregateInputSchema: z.ZodType<Prisma.SpellMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  range: z.lazy(() => SortOrderSchema).optional(),
  material: z.lazy(() => SortOrderSchema).optional(),
  ritual: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  concentration: z.lazy(() => SortOrderSchema).optional(),
  casting_time: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  attack_type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpellSumOrderByAggregateInputSchema: z.ZodType<Prisma.SpellSumOrderByAggregateInput> = z.object({
  level: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional().nullable(),
  not: InputJsonValueSchema.optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const MulticlassingNullableCompositeFilterSchema: z.ZodType<Prisma.MulticlassingNullableCompositeFilter> = z.object({
  equals: z.lazy(() => MulticlassingObjectEqualityInputSchema).optional().nullable(),
  is: z.lazy(() => MulticlassingWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => MulticlassingWhereInputSchema).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const MulticlassingObjectEqualityInputSchema: z.ZodType<Prisma.MulticlassingObjectEqualityInput> = z.object({
  prerequisites: z.lazy(() => PrerequisiteObjectEqualityInputSchema).array().optional(),
  prerequisite_options: InputJsonValueSchema.optional().nullable(),
  proficiencies: z.lazy(() => APIReferenceObjectEqualityInputSchema).array().optional(),
  proficiency_choices: z.lazy(() => ChoiceObjectEqualityInputSchema).array().optional()
}).strict();

export const StartingEquipmentCompositeListFilterSchema: z.ZodType<Prisma.StartingEquipmentCompositeListFilter> = z.object({
  equals: z.lazy(() => StartingEquipmentObjectEqualityInputSchema).array().optional(),
  every: z.lazy(() => StartingEquipmentWhereInputSchema).optional(),
  some: z.lazy(() => StartingEquipmentWhereInputSchema).optional(),
  none: z.lazy(() => StartingEquipmentWhereInputSchema).optional(),
  isEmpty: z.boolean().optional(),
  isSet: z.boolean().optional()
}).strict();

export const StartingEquipmentObjectEqualityInputSchema: z.ZodType<Prisma.StartingEquipmentObjectEqualityInput> = z.object({
  quantity: z.number(),
  equipment: z.lazy(() => APIReferenceObjectEqualityInputSchema)
}).strict();

export const ChoiceCompositeListFilterSchema: z.ZodType<Prisma.ChoiceCompositeListFilter> = z.object({
  equals: z.lazy(() => ChoiceObjectEqualityInputSchema).array().optional(),
  every: z.lazy(() => ChoiceWhereInputSchema).optional(),
  some: z.lazy(() => ChoiceWhereInputSchema).optional(),
  none: z.lazy(() => ChoiceWhereInputSchema).optional(),
  isEmpty: z.boolean().optional(),
  isSet: z.boolean().optional()
}).strict();

export const ChoiceObjectEqualityInputSchema: z.ZodType<Prisma.ChoiceObjectEqualityInput> = z.object({
  desc: z.string().optional().nullable(),
  choose: z.number().optional().nullable(),
  type: z.string().optional().nullable(),
  from: InputJsonValueSchema.optional().nullable()
}).strict();

export const ProficiencyListRelationFilterSchema: z.ZodType<Prisma.ProficiencyListRelationFilter> = z.object({
  every: z.lazy(() => ProficiencyWhereInputSchema).optional(),
  some: z.lazy(() => ProficiencyWhereInputSchema).optional(),
  none: z.lazy(() => ProficiencyWhereInputSchema).optional()
}).strict();

export const MulticlassingOrderByInputSchema: z.ZodType<Prisma.MulticlassingOrderByInput> = z.object({
  prerequisites: z.lazy(() => PrerequisiteOrderByCompositeAggregateInputSchema).optional(),
  prerequisite_options: z.lazy(() => SortOrderSchema).optional(),
  proficiencies: z.lazy(() => APIReferenceOrderByCompositeAggregateInputSchema).optional(),
  proficiency_choices: z.lazy(() => ChoiceOrderByCompositeAggregateInputSchema).optional()
}).strict();

export const StartingEquipmentOrderByCompositeAggregateInputSchema: z.ZodType<Prisma.StartingEquipmentOrderByCompositeAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChoiceOrderByCompositeAggregateInputSchema: z.ZodType<Prisma.ChoiceOrderByCompositeAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProficiencyOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProficiencyOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClassCountOrderByAggregateInputSchema: z.ZodType<Prisma.ClassCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  hit_die: z.lazy(() => SortOrderSchema).optional(),
  class_levels: z.lazy(() => SortOrderSchema).optional(),
  spells: z.lazy(() => SortOrderSchema).optional(),
  proficiency_ids: z.lazy(() => SortOrderSchema).optional(),
  spellbook_ids: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClassAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ClassAvgOrderByAggregateInput> = z.object({
  hit_die: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClassMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ClassMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  hit_die: z.lazy(() => SortOrderSchema).optional(),
  class_levels: z.lazy(() => SortOrderSchema).optional(),
  spells: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClassMinOrderByAggregateInputSchema: z.ZodType<Prisma.ClassMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  hit_die: z.lazy(() => SortOrderSchema).optional(),
  class_levels: z.lazy(() => SortOrderSchema).optional(),
  spells: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClassSumOrderByAggregateInputSchema: z.ZodType<Prisma.ClassSumOrderByAggregateInput> = z.object({
  hit_die: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AbilityBonusCompositeListFilterSchema: z.ZodType<Prisma.AbilityBonusCompositeListFilter> = z.object({
  equals: z.lazy(() => AbilityBonusObjectEqualityInputSchema).array().optional(),
  every: z.lazy(() => AbilityBonusWhereInputSchema).optional(),
  some: z.lazy(() => AbilityBonusWhereInputSchema).optional(),
  none: z.lazy(() => AbilityBonusWhereInputSchema).optional(),
  isEmpty: z.boolean().optional(),
  isSet: z.boolean().optional()
}).strict();

export const AbilityBonusObjectEqualityInputSchema: z.ZodType<Prisma.AbilityBonusObjectEqualityInput> = z.object({
  bonus: z.number(),
  ability_score: z.lazy(() => APIReferenceObjectEqualityInputSchema)
}).strict();

export const ChoiceNullableCompositeFilterSchema: z.ZodType<Prisma.ChoiceNullableCompositeFilter> = z.object({
  equals: z.lazy(() => ChoiceObjectEqualityInputSchema).optional().nullable(),
  is: z.lazy(() => ChoiceWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ChoiceWhereInputSchema).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const AbilityBonusOrderByCompositeAggregateInputSchema: z.ZodType<Prisma.AbilityBonusOrderByCompositeAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChoiceOrderByInputSchema: z.ZodType<Prisma.ChoiceOrderByInput> = z.object({
  desc: z.lazy(() => SortOrderSchema).optional(),
  choose: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RaceCountOrderByAggregateInputSchema: z.ZodType<Prisma.RaceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  speed: z.lazy(() => SortOrderSchema).optional(),
  alignment: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  size_description: z.lazy(() => SortOrderSchema).optional(),
  language_desc: z.lazy(() => SortOrderSchema).optional(),
  spellbook_ids: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RaceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RaceAvgOrderByAggregateInput> = z.object({
  speed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RaceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RaceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  speed: z.lazy(() => SortOrderSchema).optional(),
  alignment: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  size_description: z.lazy(() => SortOrderSchema).optional(),
  language_desc: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RaceMinOrderByAggregateInputSchema: z.ZodType<Prisma.RaceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  speed: z.lazy(() => SortOrderSchema).optional(),
  alignment: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  size_description: z.lazy(() => SortOrderSchema).optional(),
  language_desc: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RaceSumOrderByAggregateInputSchema: z.ZodType<Prisma.RaceSumOrderByAggregateInput> = z.object({
  speed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AbilityScoreCountOrderByAggregateInputSchema: z.ZodType<Prisma.AbilityScoreCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  desc: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AbilityScoreMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AbilityScoreMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AbilityScoreMinOrderByAggregateInputSchema: z.ZodType<Prisma.AbilityScoreMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SkillCountOrderByAggregateInputSchema: z.ZodType<Prisma.SkillCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  desc: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SkillMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SkillMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SkillMinOrderByAggregateInputSchema: z.ZodType<Prisma.SkillMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LanguageCountOrderByAggregateInputSchema: z.ZodType<Prisma.LanguageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  typical_speakers: z.lazy(() => SortOrderSchema).optional(),
  script: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LanguageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LanguageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  script: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LanguageMinOrderByAggregateInputSchema: z.ZodType<Prisma.LanguageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  script: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProficiencyCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProficiencyCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  race_ids: z.lazy(() => SortOrderSchema).optional(),
  class_ids: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProficiencyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProficiencyMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProficiencyMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProficiencyMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpellbookCreateNestedManyWithoutAuth_userInputSchema: z.ZodType<Prisma.SpellbookCreateNestedManyWithoutAuth_userInput> = z.object({
  create: z.union([ z.lazy(() => SpellbookCreateWithoutAuth_userInputSchema),z.lazy(() => SpellbookCreateWithoutAuth_userInputSchema).array(),z.lazy(() => SpellbookUncheckedCreateWithoutAuth_userInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutAuth_userInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpellbookCreateOrConnectWithoutAuth_userInputSchema),z.lazy(() => SpellbookCreateOrConnectWithoutAuth_userInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpellbookCreateManyAuth_userInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SpellbookUncheckedCreateNestedManyWithoutAuth_userInputSchema: z.ZodType<Prisma.SpellbookUncheckedCreateNestedManyWithoutAuth_userInput> = z.object({
  create: z.union([ z.lazy(() => SpellbookCreateWithoutAuth_userInputSchema),z.lazy(() => SpellbookCreateWithoutAuth_userInputSchema).array(),z.lazy(() => SpellbookUncheckedCreateWithoutAuth_userInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutAuth_userInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpellbookCreateOrConnectWithoutAuth_userInputSchema),z.lazy(() => SpellbookCreateOrConnectWithoutAuth_userInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpellbookCreateManyAuth_userInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const SpellbookUpdateManyWithoutAuth_userNestedInputSchema: z.ZodType<Prisma.SpellbookUpdateManyWithoutAuth_userNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpellbookCreateWithoutAuth_userInputSchema),z.lazy(() => SpellbookCreateWithoutAuth_userInputSchema).array(),z.lazy(() => SpellbookUncheckedCreateWithoutAuth_userInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutAuth_userInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpellbookCreateOrConnectWithoutAuth_userInputSchema),z.lazy(() => SpellbookCreateOrConnectWithoutAuth_userInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpellbookUpsertWithWhereUniqueWithoutAuth_userInputSchema),z.lazy(() => SpellbookUpsertWithWhereUniqueWithoutAuth_userInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpellbookCreateManyAuth_userInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpellbookUpdateWithWhereUniqueWithoutAuth_userInputSchema),z.lazy(() => SpellbookUpdateWithWhereUniqueWithoutAuth_userInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpellbookUpdateManyWithWhereWithoutAuth_userInputSchema),z.lazy(() => SpellbookUpdateManyWithWhereWithoutAuth_userInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpellbookScalarWhereInputSchema),z.lazy(() => SpellbookScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SpellbookUncheckedUpdateManyWithoutAuth_userNestedInputSchema: z.ZodType<Prisma.SpellbookUncheckedUpdateManyWithoutAuth_userNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpellbookCreateWithoutAuth_userInputSchema),z.lazy(() => SpellbookCreateWithoutAuth_userInputSchema).array(),z.lazy(() => SpellbookUncheckedCreateWithoutAuth_userInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutAuth_userInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpellbookCreateOrConnectWithoutAuth_userInputSchema),z.lazy(() => SpellbookCreateOrConnectWithoutAuth_userInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpellbookUpsertWithWhereUniqueWithoutAuth_userInputSchema),z.lazy(() => SpellbookUpsertWithWhereUniqueWithoutAuth_userInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpellbookCreateManyAuth_userInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpellbookUpdateWithWhereUniqueWithoutAuth_userInputSchema),z.lazy(() => SpellbookUpdateWithWhereUniqueWithoutAuth_userInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpellbookUpdateManyWithWhereWithoutAuth_userInputSchema),z.lazy(() => SpellbookUpdateManyWithWhereWithoutAuth_userInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpellbookScalarWhereInputSchema),z.lazy(() => SpellbookScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSpellbooksInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSpellbooksInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSpellbooksInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpellbooksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSpellbooksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const SpellCreateNestedManyWithoutSpellbooksInputSchema: z.ZodType<Prisma.SpellCreateNestedManyWithoutSpellbooksInput> = z.object({
  create: z.union([ z.lazy(() => SpellCreateWithoutSpellbooksInputSchema),z.lazy(() => SpellCreateWithoutSpellbooksInputSchema).array(),z.lazy(() => SpellUncheckedCreateWithoutSpellbooksInputSchema),z.lazy(() => SpellUncheckedCreateWithoutSpellbooksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpellCreateOrConnectWithoutSpellbooksInputSchema),z.lazy(() => SpellCreateOrConnectWithoutSpellbooksInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpellWhereUniqueInputSchema),z.lazy(() => SpellWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ClassCreateNestedManyWithoutSpellbooksInputSchema: z.ZodType<Prisma.ClassCreateNestedManyWithoutSpellbooksInput> = z.object({
  create: z.union([ z.lazy(() => ClassCreateWithoutSpellbooksInputSchema),z.lazy(() => ClassCreateWithoutSpellbooksInputSchema).array(),z.lazy(() => ClassUncheckedCreateWithoutSpellbooksInputSchema),z.lazy(() => ClassUncheckedCreateWithoutSpellbooksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ClassCreateOrConnectWithoutSpellbooksInputSchema),z.lazy(() => ClassCreateOrConnectWithoutSpellbooksInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ClassWhereUniqueInputSchema),z.lazy(() => ClassWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RaceCreateNestedManyWithoutSpellbooksInputSchema: z.ZodType<Prisma.RaceCreateNestedManyWithoutSpellbooksInput> = z.object({
  create: z.union([ z.lazy(() => RaceCreateWithoutSpellbooksInputSchema),z.lazy(() => RaceCreateWithoutSpellbooksInputSchema).array(),z.lazy(() => RaceUncheckedCreateWithoutSpellbooksInputSchema),z.lazy(() => RaceUncheckedCreateWithoutSpellbooksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RaceCreateOrConnectWithoutSpellbooksInputSchema),z.lazy(() => RaceCreateOrConnectWithoutSpellbooksInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RaceWhereUniqueInputSchema),z.lazy(() => RaceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SpellbookCreatespell_idsInputSchema: z.ZodType<Prisma.SpellbookCreatespell_idsInput> = z.object({
  set: z.string().array()
}).strict();

export const SpellbookCreateclass_idsInputSchema: z.ZodType<Prisma.SpellbookCreateclass_idsInput> = z.object({
  set: z.string().array()
}).strict();

export const SpellbookCreaterace_idsInputSchema: z.ZodType<Prisma.SpellbookCreaterace_idsInput> = z.object({
  set: z.string().array()
}).strict();

export const SpellUncheckedCreateNestedManyWithoutSpellbooksInputSchema: z.ZodType<Prisma.SpellUncheckedCreateNestedManyWithoutSpellbooksInput> = z.object({
  create: z.union([ z.lazy(() => SpellCreateWithoutSpellbooksInputSchema),z.lazy(() => SpellCreateWithoutSpellbooksInputSchema).array(),z.lazy(() => SpellUncheckedCreateWithoutSpellbooksInputSchema),z.lazy(() => SpellUncheckedCreateWithoutSpellbooksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpellCreateOrConnectWithoutSpellbooksInputSchema),z.lazy(() => SpellCreateOrConnectWithoutSpellbooksInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpellWhereUniqueInputSchema),z.lazy(() => SpellWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ClassUncheckedCreateNestedManyWithoutSpellbooksInputSchema: z.ZodType<Prisma.ClassUncheckedCreateNestedManyWithoutSpellbooksInput> = z.object({
  create: z.union([ z.lazy(() => ClassCreateWithoutSpellbooksInputSchema),z.lazy(() => ClassCreateWithoutSpellbooksInputSchema).array(),z.lazy(() => ClassUncheckedCreateWithoutSpellbooksInputSchema),z.lazy(() => ClassUncheckedCreateWithoutSpellbooksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ClassCreateOrConnectWithoutSpellbooksInputSchema),z.lazy(() => ClassCreateOrConnectWithoutSpellbooksInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ClassWhereUniqueInputSchema),z.lazy(() => ClassWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RaceUncheckedCreateNestedManyWithoutSpellbooksInputSchema: z.ZodType<Prisma.RaceUncheckedCreateNestedManyWithoutSpellbooksInput> = z.object({
  create: z.union([ z.lazy(() => RaceCreateWithoutSpellbooksInputSchema),z.lazy(() => RaceCreateWithoutSpellbooksInputSchema).array(),z.lazy(() => RaceUncheckedCreateWithoutSpellbooksInputSchema),z.lazy(() => RaceUncheckedCreateWithoutSpellbooksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RaceCreateOrConnectWithoutSpellbooksInputSchema),z.lazy(() => RaceCreateOrConnectWithoutSpellbooksInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RaceWhereUniqueInputSchema),z.lazy(() => RaceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutSpellbooksNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSpellbooksNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSpellbooksInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpellbooksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSpellbooksInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSpellbooksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSpellbooksInputSchema),z.lazy(() => UserUpdateWithoutSpellbooksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSpellbooksInputSchema) ]).optional(),
}).strict();

export const SpellUpdateManyWithoutSpellbooksNestedInputSchema: z.ZodType<Prisma.SpellUpdateManyWithoutSpellbooksNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpellCreateWithoutSpellbooksInputSchema),z.lazy(() => SpellCreateWithoutSpellbooksInputSchema).array(),z.lazy(() => SpellUncheckedCreateWithoutSpellbooksInputSchema),z.lazy(() => SpellUncheckedCreateWithoutSpellbooksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpellCreateOrConnectWithoutSpellbooksInputSchema),z.lazy(() => SpellCreateOrConnectWithoutSpellbooksInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpellUpsertWithWhereUniqueWithoutSpellbooksInputSchema),z.lazy(() => SpellUpsertWithWhereUniqueWithoutSpellbooksInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SpellWhereUniqueInputSchema),z.lazy(() => SpellWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpellWhereUniqueInputSchema),z.lazy(() => SpellWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpellWhereUniqueInputSchema),z.lazy(() => SpellWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpellWhereUniqueInputSchema),z.lazy(() => SpellWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpellUpdateWithWhereUniqueWithoutSpellbooksInputSchema),z.lazy(() => SpellUpdateWithWhereUniqueWithoutSpellbooksInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpellUpdateManyWithWhereWithoutSpellbooksInputSchema),z.lazy(() => SpellUpdateManyWithWhereWithoutSpellbooksInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpellScalarWhereInputSchema),z.lazy(() => SpellScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ClassUpdateManyWithoutSpellbooksNestedInputSchema: z.ZodType<Prisma.ClassUpdateManyWithoutSpellbooksNestedInput> = z.object({
  create: z.union([ z.lazy(() => ClassCreateWithoutSpellbooksInputSchema),z.lazy(() => ClassCreateWithoutSpellbooksInputSchema).array(),z.lazy(() => ClassUncheckedCreateWithoutSpellbooksInputSchema),z.lazy(() => ClassUncheckedCreateWithoutSpellbooksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ClassCreateOrConnectWithoutSpellbooksInputSchema),z.lazy(() => ClassCreateOrConnectWithoutSpellbooksInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ClassUpsertWithWhereUniqueWithoutSpellbooksInputSchema),z.lazy(() => ClassUpsertWithWhereUniqueWithoutSpellbooksInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ClassWhereUniqueInputSchema),z.lazy(() => ClassWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ClassWhereUniqueInputSchema),z.lazy(() => ClassWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ClassWhereUniqueInputSchema),z.lazy(() => ClassWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ClassWhereUniqueInputSchema),z.lazy(() => ClassWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ClassUpdateWithWhereUniqueWithoutSpellbooksInputSchema),z.lazy(() => ClassUpdateWithWhereUniqueWithoutSpellbooksInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ClassUpdateManyWithWhereWithoutSpellbooksInputSchema),z.lazy(() => ClassUpdateManyWithWhereWithoutSpellbooksInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ClassScalarWhereInputSchema),z.lazy(() => ClassScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RaceUpdateManyWithoutSpellbooksNestedInputSchema: z.ZodType<Prisma.RaceUpdateManyWithoutSpellbooksNestedInput> = z.object({
  create: z.union([ z.lazy(() => RaceCreateWithoutSpellbooksInputSchema),z.lazy(() => RaceCreateWithoutSpellbooksInputSchema).array(),z.lazy(() => RaceUncheckedCreateWithoutSpellbooksInputSchema),z.lazy(() => RaceUncheckedCreateWithoutSpellbooksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RaceCreateOrConnectWithoutSpellbooksInputSchema),z.lazy(() => RaceCreateOrConnectWithoutSpellbooksInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RaceUpsertWithWhereUniqueWithoutSpellbooksInputSchema),z.lazy(() => RaceUpsertWithWhereUniqueWithoutSpellbooksInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => RaceWhereUniqueInputSchema),z.lazy(() => RaceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RaceWhereUniqueInputSchema),z.lazy(() => RaceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RaceWhereUniqueInputSchema),z.lazy(() => RaceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RaceWhereUniqueInputSchema),z.lazy(() => RaceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RaceUpdateWithWhereUniqueWithoutSpellbooksInputSchema),z.lazy(() => RaceUpdateWithWhereUniqueWithoutSpellbooksInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RaceUpdateManyWithWhereWithoutSpellbooksInputSchema),z.lazy(() => RaceUpdateManyWithWhereWithoutSpellbooksInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RaceScalarWhereInputSchema),z.lazy(() => RaceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SpellbookUpdatespell_idsInputSchema: z.ZodType<Prisma.SpellbookUpdatespell_idsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const SpellbookUpdateclass_idsInputSchema: z.ZodType<Prisma.SpellbookUpdateclass_idsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const SpellbookUpdaterace_idsInputSchema: z.ZodType<Prisma.SpellbookUpdaterace_idsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const SpellUncheckedUpdateManyWithoutSpellbooksNestedInputSchema: z.ZodType<Prisma.SpellUncheckedUpdateManyWithoutSpellbooksNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpellCreateWithoutSpellbooksInputSchema),z.lazy(() => SpellCreateWithoutSpellbooksInputSchema).array(),z.lazy(() => SpellUncheckedCreateWithoutSpellbooksInputSchema),z.lazy(() => SpellUncheckedCreateWithoutSpellbooksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpellCreateOrConnectWithoutSpellbooksInputSchema),z.lazy(() => SpellCreateOrConnectWithoutSpellbooksInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpellUpsertWithWhereUniqueWithoutSpellbooksInputSchema),z.lazy(() => SpellUpsertWithWhereUniqueWithoutSpellbooksInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SpellWhereUniqueInputSchema),z.lazy(() => SpellWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpellWhereUniqueInputSchema),z.lazy(() => SpellWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpellWhereUniqueInputSchema),z.lazy(() => SpellWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpellWhereUniqueInputSchema),z.lazy(() => SpellWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpellUpdateWithWhereUniqueWithoutSpellbooksInputSchema),z.lazy(() => SpellUpdateWithWhereUniqueWithoutSpellbooksInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpellUpdateManyWithWhereWithoutSpellbooksInputSchema),z.lazy(() => SpellUpdateManyWithWhereWithoutSpellbooksInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpellScalarWhereInputSchema),z.lazy(() => SpellScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ClassUncheckedUpdateManyWithoutSpellbooksNestedInputSchema: z.ZodType<Prisma.ClassUncheckedUpdateManyWithoutSpellbooksNestedInput> = z.object({
  create: z.union([ z.lazy(() => ClassCreateWithoutSpellbooksInputSchema),z.lazy(() => ClassCreateWithoutSpellbooksInputSchema).array(),z.lazy(() => ClassUncheckedCreateWithoutSpellbooksInputSchema),z.lazy(() => ClassUncheckedCreateWithoutSpellbooksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ClassCreateOrConnectWithoutSpellbooksInputSchema),z.lazy(() => ClassCreateOrConnectWithoutSpellbooksInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ClassUpsertWithWhereUniqueWithoutSpellbooksInputSchema),z.lazy(() => ClassUpsertWithWhereUniqueWithoutSpellbooksInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ClassWhereUniqueInputSchema),z.lazy(() => ClassWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ClassWhereUniqueInputSchema),z.lazy(() => ClassWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ClassWhereUniqueInputSchema),z.lazy(() => ClassWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ClassWhereUniqueInputSchema),z.lazy(() => ClassWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ClassUpdateWithWhereUniqueWithoutSpellbooksInputSchema),z.lazy(() => ClassUpdateWithWhereUniqueWithoutSpellbooksInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ClassUpdateManyWithWhereWithoutSpellbooksInputSchema),z.lazy(() => ClassUpdateManyWithWhereWithoutSpellbooksInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ClassScalarWhereInputSchema),z.lazy(() => ClassScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RaceUncheckedUpdateManyWithoutSpellbooksNestedInputSchema: z.ZodType<Prisma.RaceUncheckedUpdateManyWithoutSpellbooksNestedInput> = z.object({
  create: z.union([ z.lazy(() => RaceCreateWithoutSpellbooksInputSchema),z.lazy(() => RaceCreateWithoutSpellbooksInputSchema).array(),z.lazy(() => RaceUncheckedCreateWithoutSpellbooksInputSchema),z.lazy(() => RaceUncheckedCreateWithoutSpellbooksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RaceCreateOrConnectWithoutSpellbooksInputSchema),z.lazy(() => RaceCreateOrConnectWithoutSpellbooksInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RaceUpsertWithWhereUniqueWithoutSpellbooksInputSchema),z.lazy(() => RaceUpsertWithWhereUniqueWithoutSpellbooksInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => RaceWhereUniqueInputSchema),z.lazy(() => RaceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RaceWhereUniqueInputSchema),z.lazy(() => RaceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RaceWhereUniqueInputSchema),z.lazy(() => RaceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RaceWhereUniqueInputSchema),z.lazy(() => RaceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RaceUpdateWithWhereUniqueWithoutSpellbooksInputSchema),z.lazy(() => RaceUpdateWithWhereUniqueWithoutSpellbooksInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RaceUpdateManyWithWhereWithoutSpellbooksInputSchema),z.lazy(() => RaceUpdateManyWithWhereWithoutSpellbooksInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RaceScalarWhereInputSchema),z.lazy(() => RaceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SpellCreatedescInputSchema: z.ZodType<Prisma.SpellCreatedescInput> = z.object({
  set: z.string().array()
}).strict();

export const SpellCreatehigher_levelInputSchema: z.ZodType<Prisma.SpellCreatehigher_levelInput> = z.object({
  set: z.string().array()
}).strict();

export const SpellCreatecomponentsInputSchema: z.ZodType<Prisma.SpellCreatecomponentsInput> = z.object({
  set: z.lazy(() => ComponentsSchema).array()
}).strict();

export const AreaOfEffectNullableCreateEnvelopeInputSchema: z.ZodType<Prisma.AreaOfEffectNullableCreateEnvelopeInput> = z.object({
  set: z.lazy(() => AreaOfEffectCreateInputSchema).optional().nullable()
}).strict();

export const AreaOfEffectCreateInputSchema: z.ZodType<Prisma.AreaOfEffectCreateInput> = z.object({
  size: z.number(),
  type: z.lazy(() => AOETypeSchema)
}).strict();

export const DifficultyClassNullableCreateEnvelopeInputSchema: z.ZodType<Prisma.DifficultyClassNullableCreateEnvelopeInput> = z.object({
  set: z.lazy(() => DifficultyClassCreateInputSchema).optional().nullable()
}).strict();

export const DifficultyClassCreateInputSchema: z.ZodType<Prisma.DifficultyClassCreateInput> = z.object({
  dc_success: z.string(),
  dc_type: z.lazy(() => APIReferenceCreateInputSchema),
  desc: z.string().optional().nullable()
}).strict();

export const APIReferenceCreateEnvelopeInputSchema: z.ZodType<Prisma.APIReferenceCreateEnvelopeInput> = z.object({
  set: z.lazy(() => APIReferenceCreateInputSchema).optional()
}).strict();

export const APIReferenceCreateInputSchema: z.ZodType<Prisma.APIReferenceCreateInput> = z.object({
  index: z.string(),
  name: z.string(),
  url: z.string()
}).strict();

export const APIReferenceListCreateEnvelopeInputSchema: z.ZodType<Prisma.APIReferenceListCreateEnvelopeInput> = z.object({
  set: z.union([ z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
}).strict();

export const SpellbookCreateNestedManyWithoutSpellsInputSchema: z.ZodType<Prisma.SpellbookCreateNestedManyWithoutSpellsInput> = z.object({
  create: z.union([ z.lazy(() => SpellbookCreateWithoutSpellsInputSchema),z.lazy(() => SpellbookCreateWithoutSpellsInputSchema).array(),z.lazy(() => SpellbookUncheckedCreateWithoutSpellsInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutSpellsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpellbookCreateOrConnectWithoutSpellsInputSchema),z.lazy(() => SpellbookCreateOrConnectWithoutSpellsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SpellCreatespellbook_idsInputSchema: z.ZodType<Prisma.SpellCreatespellbook_idsInput> = z.object({
  set: z.string().array()
}).strict();

export const SpellbookUncheckedCreateNestedManyWithoutSpellsInputSchema: z.ZodType<Prisma.SpellbookUncheckedCreateNestedManyWithoutSpellsInput> = z.object({
  create: z.union([ z.lazy(() => SpellbookCreateWithoutSpellsInputSchema),z.lazy(() => SpellbookCreateWithoutSpellsInputSchema).array(),z.lazy(() => SpellbookUncheckedCreateWithoutSpellsInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutSpellsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpellbookCreateOrConnectWithoutSpellsInputSchema),z.lazy(() => SpellbookCreateOrConnectWithoutSpellsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SpellUpdatedescInputSchema: z.ZodType<Prisma.SpellUpdatedescInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const SpellUpdatehigher_levelInputSchema: z.ZodType<Prisma.SpellUpdatehigher_levelInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const SpellUpdatecomponentsInputSchema: z.ZodType<Prisma.SpellUpdatecomponentsInput> = z.object({
  set: z.lazy(() => ComponentsSchema).array().optional(),
  push: z.union([ z.lazy(() => ComponentsSchema),z.lazy(() => ComponentsSchema).array() ]).optional(),
}).strict();

export const AreaOfEffectNullableUpdateEnvelopeInputSchema: z.ZodType<Prisma.AreaOfEffectNullableUpdateEnvelopeInput> = z.object({
  set: z.lazy(() => AreaOfEffectCreateInputSchema).optional().nullable(),
  upsert: z.lazy(() => AreaOfEffectUpsertInputSchema).optional(),
  unset: z.boolean().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const DifficultyClassNullableUpdateEnvelopeInputSchema: z.ZodType<Prisma.DifficultyClassNullableUpdateEnvelopeInput> = z.object({
  set: z.lazy(() => DifficultyClassCreateInputSchema).optional().nullable(),
  upsert: z.lazy(() => DifficultyClassUpsertInputSchema).optional(),
  unset: z.boolean().optional()
}).strict();

export const APIReferenceUpdateEnvelopeInputSchema: z.ZodType<Prisma.APIReferenceUpdateEnvelopeInput> = z.object({
  set: z.lazy(() => APIReferenceCreateInputSchema).optional(),
  update: z.lazy(() => APIReferenceUpdateInputSchema).optional()
}).strict();

export const APIReferenceListUpdateEnvelopeInputSchema: z.ZodType<Prisma.APIReferenceListUpdateEnvelopeInput> = z.object({
  set: z.union([ z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  push: z.union([ z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  updateMany: z.lazy(() => APIReferenceUpdateManyInputSchema).optional(),
  deleteMany: z.lazy(() => APIReferenceDeleteManyInputSchema).optional()
}).strict();

export const SpellbookUpdateManyWithoutSpellsNestedInputSchema: z.ZodType<Prisma.SpellbookUpdateManyWithoutSpellsNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpellbookCreateWithoutSpellsInputSchema),z.lazy(() => SpellbookCreateWithoutSpellsInputSchema).array(),z.lazy(() => SpellbookUncheckedCreateWithoutSpellsInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutSpellsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpellbookCreateOrConnectWithoutSpellsInputSchema),z.lazy(() => SpellbookCreateOrConnectWithoutSpellsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpellbookUpsertWithWhereUniqueWithoutSpellsInputSchema),z.lazy(() => SpellbookUpsertWithWhereUniqueWithoutSpellsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpellbookUpdateWithWhereUniqueWithoutSpellsInputSchema),z.lazy(() => SpellbookUpdateWithWhereUniqueWithoutSpellsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpellbookUpdateManyWithWhereWithoutSpellsInputSchema),z.lazy(() => SpellbookUpdateManyWithWhereWithoutSpellsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpellbookScalarWhereInputSchema),z.lazy(() => SpellbookScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SpellUpdatespellbook_idsInputSchema: z.ZodType<Prisma.SpellUpdatespellbook_idsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const SpellbookUncheckedUpdateManyWithoutSpellsNestedInputSchema: z.ZodType<Prisma.SpellbookUncheckedUpdateManyWithoutSpellsNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpellbookCreateWithoutSpellsInputSchema),z.lazy(() => SpellbookCreateWithoutSpellsInputSchema).array(),z.lazy(() => SpellbookUncheckedCreateWithoutSpellsInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutSpellsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpellbookCreateOrConnectWithoutSpellsInputSchema),z.lazy(() => SpellbookCreateOrConnectWithoutSpellsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpellbookUpsertWithWhereUniqueWithoutSpellsInputSchema),z.lazy(() => SpellbookUpsertWithWhereUniqueWithoutSpellsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpellbookUpdateWithWhereUniqueWithoutSpellsInputSchema),z.lazy(() => SpellbookUpdateWithWhereUniqueWithoutSpellsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpellbookUpdateManyWithWhereWithoutSpellsInputSchema),z.lazy(() => SpellbookUpdateManyWithWhereWithoutSpellsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpellbookScalarWhereInputSchema),z.lazy(() => SpellbookScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MulticlassingNullableCreateEnvelopeInputSchema: z.ZodType<Prisma.MulticlassingNullableCreateEnvelopeInput> = z.object({
  set: z.lazy(() => MulticlassingCreateInputSchema).optional().nullable()
}).strict();

export const MulticlassingCreateInputSchema: z.ZodType<Prisma.MulticlassingCreateInput> = z.object({
  prerequisites: z.union([ z.lazy(() => PrerequisiteCreateInputSchema),z.lazy(() => PrerequisiteCreateInputSchema).array() ]).optional(),
  prerequisite_options: InputJsonValueSchema.optional().nullable(),
  proficiencies: z.union([ z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
}).strict();

export const StartingEquipmentListCreateEnvelopeInputSchema: z.ZodType<Prisma.StartingEquipmentListCreateEnvelopeInput> = z.object({
  set: z.union([ z.lazy(() => StartingEquipmentCreateInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema).array() ]).optional(),
}).strict();

export const StartingEquipmentCreateInputSchema: z.ZodType<Prisma.StartingEquipmentCreateInput> = z.object({
  quantity: z.number(),
  equipment: z.lazy(() => APIReferenceCreateInputSchema)
}).strict();

export const ChoiceListCreateEnvelopeInputSchema: z.ZodType<Prisma.ChoiceListCreateEnvelopeInput> = z.object({
  set: z.union([ z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
}).strict();

export const ChoiceCreateInputSchema: z.ZodType<Prisma.ChoiceCreateInput> = z.object({
  desc: z.string().optional().nullable(),
  choose: z.number().optional().nullable(),
  type: z.string().optional().nullable(),
  from: InputJsonValueSchema.optional().nullable()
}).strict();

export const ProficiencyCreateNestedManyWithoutClassesInputSchema: z.ZodType<Prisma.ProficiencyCreateNestedManyWithoutClassesInput> = z.object({
  create: z.union([ z.lazy(() => ProficiencyCreateWithoutClassesInputSchema),z.lazy(() => ProficiencyCreateWithoutClassesInputSchema).array(),z.lazy(() => ProficiencyUncheckedCreateWithoutClassesInputSchema),z.lazy(() => ProficiencyUncheckedCreateWithoutClassesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProficiencyCreateOrConnectWithoutClassesInputSchema),z.lazy(() => ProficiencyCreateOrConnectWithoutClassesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProficiencyWhereUniqueInputSchema),z.lazy(() => ProficiencyWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SpellbookCreateNestedManyWithoutClassesInputSchema: z.ZodType<Prisma.SpellbookCreateNestedManyWithoutClassesInput> = z.object({
  create: z.union([ z.lazy(() => SpellbookCreateWithoutClassesInputSchema),z.lazy(() => SpellbookCreateWithoutClassesInputSchema).array(),z.lazy(() => SpellbookUncheckedCreateWithoutClassesInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutClassesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpellbookCreateOrConnectWithoutClassesInputSchema),z.lazy(() => SpellbookCreateOrConnectWithoutClassesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ClassCreateproficiency_idsInputSchema: z.ZodType<Prisma.ClassCreateproficiency_idsInput> = z.object({
  set: z.string().array()
}).strict();

export const ClassCreatespellbook_idsInputSchema: z.ZodType<Prisma.ClassCreatespellbook_idsInput> = z.object({
  set: z.string().array()
}).strict();

export const ProficiencyUncheckedCreateNestedManyWithoutClassesInputSchema: z.ZodType<Prisma.ProficiencyUncheckedCreateNestedManyWithoutClassesInput> = z.object({
  create: z.union([ z.lazy(() => ProficiencyCreateWithoutClassesInputSchema),z.lazy(() => ProficiencyCreateWithoutClassesInputSchema).array(),z.lazy(() => ProficiencyUncheckedCreateWithoutClassesInputSchema),z.lazy(() => ProficiencyUncheckedCreateWithoutClassesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProficiencyCreateOrConnectWithoutClassesInputSchema),z.lazy(() => ProficiencyCreateOrConnectWithoutClassesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProficiencyWhereUniqueInputSchema),z.lazy(() => ProficiencyWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SpellbookUncheckedCreateNestedManyWithoutClassesInputSchema: z.ZodType<Prisma.SpellbookUncheckedCreateNestedManyWithoutClassesInput> = z.object({
  create: z.union([ z.lazy(() => SpellbookCreateWithoutClassesInputSchema),z.lazy(() => SpellbookCreateWithoutClassesInputSchema).array(),z.lazy(() => SpellbookUncheckedCreateWithoutClassesInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutClassesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpellbookCreateOrConnectWithoutClassesInputSchema),z.lazy(() => SpellbookCreateOrConnectWithoutClassesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MulticlassingNullableUpdateEnvelopeInputSchema: z.ZodType<Prisma.MulticlassingNullableUpdateEnvelopeInput> = z.object({
  set: z.lazy(() => MulticlassingCreateInputSchema).optional().nullable(),
  upsert: z.lazy(() => MulticlassingUpsertInputSchema).optional(),
  unset: z.boolean().optional()
}).strict();

export const StartingEquipmentListUpdateEnvelopeInputSchema: z.ZodType<Prisma.StartingEquipmentListUpdateEnvelopeInput> = z.object({
  set: z.union([ z.lazy(() => StartingEquipmentCreateInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema).array() ]).optional(),
  push: z.union([ z.lazy(() => StartingEquipmentCreateInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema).array() ]).optional(),
  updateMany: z.lazy(() => StartingEquipmentUpdateManyInputSchema).optional(),
  deleteMany: z.lazy(() => StartingEquipmentDeleteManyInputSchema).optional()
}).strict();

export const ChoiceListUpdateEnvelopeInputSchema: z.ZodType<Prisma.ChoiceListUpdateEnvelopeInput> = z.object({
  set: z.union([ z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  push: z.union([ z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  updateMany: z.lazy(() => ChoiceUpdateManyInputSchema).optional(),
  deleteMany: z.lazy(() => ChoiceDeleteManyInputSchema).optional()
}).strict();

export const ProficiencyUpdateManyWithoutClassesNestedInputSchema: z.ZodType<Prisma.ProficiencyUpdateManyWithoutClassesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProficiencyCreateWithoutClassesInputSchema),z.lazy(() => ProficiencyCreateWithoutClassesInputSchema).array(),z.lazy(() => ProficiencyUncheckedCreateWithoutClassesInputSchema),z.lazy(() => ProficiencyUncheckedCreateWithoutClassesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProficiencyCreateOrConnectWithoutClassesInputSchema),z.lazy(() => ProficiencyCreateOrConnectWithoutClassesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProficiencyUpsertWithWhereUniqueWithoutClassesInputSchema),z.lazy(() => ProficiencyUpsertWithWhereUniqueWithoutClassesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ProficiencyWhereUniqueInputSchema),z.lazy(() => ProficiencyWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProficiencyWhereUniqueInputSchema),z.lazy(() => ProficiencyWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProficiencyWhereUniqueInputSchema),z.lazy(() => ProficiencyWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProficiencyWhereUniqueInputSchema),z.lazy(() => ProficiencyWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProficiencyUpdateWithWhereUniqueWithoutClassesInputSchema),z.lazy(() => ProficiencyUpdateWithWhereUniqueWithoutClassesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProficiencyUpdateManyWithWhereWithoutClassesInputSchema),z.lazy(() => ProficiencyUpdateManyWithWhereWithoutClassesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProficiencyScalarWhereInputSchema),z.lazy(() => ProficiencyScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SpellbookUpdateManyWithoutClassesNestedInputSchema: z.ZodType<Prisma.SpellbookUpdateManyWithoutClassesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpellbookCreateWithoutClassesInputSchema),z.lazy(() => SpellbookCreateWithoutClassesInputSchema).array(),z.lazy(() => SpellbookUncheckedCreateWithoutClassesInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutClassesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpellbookCreateOrConnectWithoutClassesInputSchema),z.lazy(() => SpellbookCreateOrConnectWithoutClassesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpellbookUpsertWithWhereUniqueWithoutClassesInputSchema),z.lazy(() => SpellbookUpsertWithWhereUniqueWithoutClassesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpellbookUpdateWithWhereUniqueWithoutClassesInputSchema),z.lazy(() => SpellbookUpdateWithWhereUniqueWithoutClassesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpellbookUpdateManyWithWhereWithoutClassesInputSchema),z.lazy(() => SpellbookUpdateManyWithWhereWithoutClassesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpellbookScalarWhereInputSchema),z.lazy(() => SpellbookScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ClassUpdateproficiency_idsInputSchema: z.ZodType<Prisma.ClassUpdateproficiency_idsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const ClassUpdatespellbook_idsInputSchema: z.ZodType<Prisma.ClassUpdatespellbook_idsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const ProficiencyUncheckedUpdateManyWithoutClassesNestedInputSchema: z.ZodType<Prisma.ProficiencyUncheckedUpdateManyWithoutClassesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProficiencyCreateWithoutClassesInputSchema),z.lazy(() => ProficiencyCreateWithoutClassesInputSchema).array(),z.lazy(() => ProficiencyUncheckedCreateWithoutClassesInputSchema),z.lazy(() => ProficiencyUncheckedCreateWithoutClassesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProficiencyCreateOrConnectWithoutClassesInputSchema),z.lazy(() => ProficiencyCreateOrConnectWithoutClassesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProficiencyUpsertWithWhereUniqueWithoutClassesInputSchema),z.lazy(() => ProficiencyUpsertWithWhereUniqueWithoutClassesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ProficiencyWhereUniqueInputSchema),z.lazy(() => ProficiencyWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProficiencyWhereUniqueInputSchema),z.lazy(() => ProficiencyWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProficiencyWhereUniqueInputSchema),z.lazy(() => ProficiencyWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProficiencyWhereUniqueInputSchema),z.lazy(() => ProficiencyWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProficiencyUpdateWithWhereUniqueWithoutClassesInputSchema),z.lazy(() => ProficiencyUpdateWithWhereUniqueWithoutClassesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProficiencyUpdateManyWithWhereWithoutClassesInputSchema),z.lazy(() => ProficiencyUpdateManyWithWhereWithoutClassesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProficiencyScalarWhereInputSchema),z.lazy(() => ProficiencyScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SpellbookUncheckedUpdateManyWithoutClassesNestedInputSchema: z.ZodType<Prisma.SpellbookUncheckedUpdateManyWithoutClassesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpellbookCreateWithoutClassesInputSchema),z.lazy(() => SpellbookCreateWithoutClassesInputSchema).array(),z.lazy(() => SpellbookUncheckedCreateWithoutClassesInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutClassesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpellbookCreateOrConnectWithoutClassesInputSchema),z.lazy(() => SpellbookCreateOrConnectWithoutClassesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpellbookUpsertWithWhereUniqueWithoutClassesInputSchema),z.lazy(() => SpellbookUpsertWithWhereUniqueWithoutClassesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpellbookUpdateWithWhereUniqueWithoutClassesInputSchema),z.lazy(() => SpellbookUpdateWithWhereUniqueWithoutClassesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpellbookUpdateManyWithWhereWithoutClassesInputSchema),z.lazy(() => SpellbookUpdateManyWithWhereWithoutClassesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpellbookScalarWhereInputSchema),z.lazy(() => SpellbookScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AbilityBonusListCreateEnvelopeInputSchema: z.ZodType<Prisma.AbilityBonusListCreateEnvelopeInput> = z.object({
  set: z.union([ z.lazy(() => AbilityBonusCreateInputSchema),z.lazy(() => AbilityBonusCreateInputSchema).array() ]).optional(),
}).strict();

export const AbilityBonusCreateInputSchema: z.ZodType<Prisma.AbilityBonusCreateInput> = z.object({
  bonus: z.number(),
  ability_score: z.lazy(() => APIReferenceCreateInputSchema)
}).strict();

export const ChoiceNullableCreateEnvelopeInputSchema: z.ZodType<Prisma.ChoiceNullableCreateEnvelopeInput> = z.object({
  set: z.lazy(() => ChoiceCreateInputSchema).optional().nullable()
}).strict();

export const SpellbookCreateNestedManyWithoutRacesInputSchema: z.ZodType<Prisma.SpellbookCreateNestedManyWithoutRacesInput> = z.object({
  create: z.union([ z.lazy(() => SpellbookCreateWithoutRacesInputSchema),z.lazy(() => SpellbookCreateWithoutRacesInputSchema).array(),z.lazy(() => SpellbookUncheckedCreateWithoutRacesInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutRacesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpellbookCreateOrConnectWithoutRacesInputSchema),z.lazy(() => SpellbookCreateOrConnectWithoutRacesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RaceCreatespellbook_idsInputSchema: z.ZodType<Prisma.RaceCreatespellbook_idsInput> = z.object({
  set: z.string().array()
}).strict();

export const SpellbookUncheckedCreateNestedManyWithoutRacesInputSchema: z.ZodType<Prisma.SpellbookUncheckedCreateNestedManyWithoutRacesInput> = z.object({
  create: z.union([ z.lazy(() => SpellbookCreateWithoutRacesInputSchema),z.lazy(() => SpellbookCreateWithoutRacesInputSchema).array(),z.lazy(() => SpellbookUncheckedCreateWithoutRacesInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutRacesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpellbookCreateOrConnectWithoutRacesInputSchema),z.lazy(() => SpellbookCreateOrConnectWithoutRacesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AbilityBonusListUpdateEnvelopeInputSchema: z.ZodType<Prisma.AbilityBonusListUpdateEnvelopeInput> = z.object({
  set: z.union([ z.lazy(() => AbilityBonusCreateInputSchema),z.lazy(() => AbilityBonusCreateInputSchema).array() ]).optional(),
  push: z.union([ z.lazy(() => AbilityBonusCreateInputSchema),z.lazy(() => AbilityBonusCreateInputSchema).array() ]).optional(),
  updateMany: z.lazy(() => AbilityBonusUpdateManyInputSchema).optional(),
  deleteMany: z.lazy(() => AbilityBonusDeleteManyInputSchema).optional()
}).strict();

export const ChoiceNullableUpdateEnvelopeInputSchema: z.ZodType<Prisma.ChoiceNullableUpdateEnvelopeInput> = z.object({
  set: z.lazy(() => ChoiceCreateInputSchema).optional().nullable(),
  upsert: z.lazy(() => ChoiceUpsertInputSchema).optional(),
  unset: z.boolean().optional()
}).strict();

export const SpellbookUpdateManyWithoutRacesNestedInputSchema: z.ZodType<Prisma.SpellbookUpdateManyWithoutRacesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpellbookCreateWithoutRacesInputSchema),z.lazy(() => SpellbookCreateWithoutRacesInputSchema).array(),z.lazy(() => SpellbookUncheckedCreateWithoutRacesInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutRacesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpellbookCreateOrConnectWithoutRacesInputSchema),z.lazy(() => SpellbookCreateOrConnectWithoutRacesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpellbookUpsertWithWhereUniqueWithoutRacesInputSchema),z.lazy(() => SpellbookUpsertWithWhereUniqueWithoutRacesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpellbookUpdateWithWhereUniqueWithoutRacesInputSchema),z.lazy(() => SpellbookUpdateWithWhereUniqueWithoutRacesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpellbookUpdateManyWithWhereWithoutRacesInputSchema),z.lazy(() => SpellbookUpdateManyWithWhereWithoutRacesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpellbookScalarWhereInputSchema),z.lazy(() => SpellbookScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RaceUpdatespellbook_idsInputSchema: z.ZodType<Prisma.RaceUpdatespellbook_idsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const SpellbookUncheckedUpdateManyWithoutRacesNestedInputSchema: z.ZodType<Prisma.SpellbookUncheckedUpdateManyWithoutRacesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpellbookCreateWithoutRacesInputSchema),z.lazy(() => SpellbookCreateWithoutRacesInputSchema).array(),z.lazy(() => SpellbookUncheckedCreateWithoutRacesInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutRacesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpellbookCreateOrConnectWithoutRacesInputSchema),z.lazy(() => SpellbookCreateOrConnectWithoutRacesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpellbookUpsertWithWhereUniqueWithoutRacesInputSchema),z.lazy(() => SpellbookUpsertWithWhereUniqueWithoutRacesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpellbookWhereUniqueInputSchema),z.lazy(() => SpellbookWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpellbookUpdateWithWhereUniqueWithoutRacesInputSchema),z.lazy(() => SpellbookUpdateWithWhereUniqueWithoutRacesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpellbookUpdateManyWithWhereWithoutRacesInputSchema),z.lazy(() => SpellbookUpdateManyWithWhereWithoutRacesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpellbookScalarWhereInputSchema),z.lazy(() => SpellbookScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AbilityScoreCreatedescInputSchema: z.ZodType<Prisma.AbilityScoreCreatedescInput> = z.object({
  set: z.string().array()
}).strict();

export const AbilityScoreUpdatedescInputSchema: z.ZodType<Prisma.AbilityScoreUpdatedescInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const SkillCreatedescInputSchema: z.ZodType<Prisma.SkillCreatedescInput> = z.object({
  set: z.string().array()
}).strict();

export const SkillUpdatedescInputSchema: z.ZodType<Prisma.SkillUpdatedescInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const LanguageCreatetypical_speakersInputSchema: z.ZodType<Prisma.LanguageCreatetypical_speakersInput> = z.object({
  set: z.string().array()
}).strict();

export const LanguageUpdatetypical_speakersInputSchema: z.ZodType<Prisma.LanguageUpdatetypical_speakersInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const ProficiencyCreaterace_idsInputSchema: z.ZodType<Prisma.ProficiencyCreaterace_idsInput> = z.object({
  set: z.string().array()
}).strict();

export const ClassCreateNestedManyWithoutProficienciesInputSchema: z.ZodType<Prisma.ClassCreateNestedManyWithoutProficienciesInput> = z.object({
  create: z.union([ z.lazy(() => ClassCreateWithoutProficienciesInputSchema),z.lazy(() => ClassCreateWithoutProficienciesInputSchema).array(),z.lazy(() => ClassUncheckedCreateWithoutProficienciesInputSchema),z.lazy(() => ClassUncheckedCreateWithoutProficienciesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ClassCreateOrConnectWithoutProficienciesInputSchema),z.lazy(() => ClassCreateOrConnectWithoutProficienciesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ClassWhereUniqueInputSchema),z.lazy(() => ClassWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProficiencyCreateclass_idsInputSchema: z.ZodType<Prisma.ProficiencyCreateclass_idsInput> = z.object({
  set: z.string().array()
}).strict();

export const ClassUncheckedCreateNestedManyWithoutProficienciesInputSchema: z.ZodType<Prisma.ClassUncheckedCreateNestedManyWithoutProficienciesInput> = z.object({
  create: z.union([ z.lazy(() => ClassCreateWithoutProficienciesInputSchema),z.lazy(() => ClassCreateWithoutProficienciesInputSchema).array(),z.lazy(() => ClassUncheckedCreateWithoutProficienciesInputSchema),z.lazy(() => ClassUncheckedCreateWithoutProficienciesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ClassCreateOrConnectWithoutProficienciesInputSchema),z.lazy(() => ClassCreateOrConnectWithoutProficienciesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ClassWhereUniqueInputSchema),z.lazy(() => ClassWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProficiencyUpdaterace_idsInputSchema: z.ZodType<Prisma.ProficiencyUpdaterace_idsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const ClassUpdateManyWithoutProficienciesNestedInputSchema: z.ZodType<Prisma.ClassUpdateManyWithoutProficienciesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ClassCreateWithoutProficienciesInputSchema),z.lazy(() => ClassCreateWithoutProficienciesInputSchema).array(),z.lazy(() => ClassUncheckedCreateWithoutProficienciesInputSchema),z.lazy(() => ClassUncheckedCreateWithoutProficienciesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ClassCreateOrConnectWithoutProficienciesInputSchema),z.lazy(() => ClassCreateOrConnectWithoutProficienciesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ClassUpsertWithWhereUniqueWithoutProficienciesInputSchema),z.lazy(() => ClassUpsertWithWhereUniqueWithoutProficienciesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ClassWhereUniqueInputSchema),z.lazy(() => ClassWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ClassWhereUniqueInputSchema),z.lazy(() => ClassWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ClassWhereUniqueInputSchema),z.lazy(() => ClassWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ClassWhereUniqueInputSchema),z.lazy(() => ClassWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ClassUpdateWithWhereUniqueWithoutProficienciesInputSchema),z.lazy(() => ClassUpdateWithWhereUniqueWithoutProficienciesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ClassUpdateManyWithWhereWithoutProficienciesInputSchema),z.lazy(() => ClassUpdateManyWithWhereWithoutProficienciesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ClassScalarWhereInputSchema),z.lazy(() => ClassScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProficiencyUpdateclass_idsInputSchema: z.ZodType<Prisma.ProficiencyUpdateclass_idsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const ClassUncheckedUpdateManyWithoutProficienciesNestedInputSchema: z.ZodType<Prisma.ClassUncheckedUpdateManyWithoutProficienciesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ClassCreateWithoutProficienciesInputSchema),z.lazy(() => ClassCreateWithoutProficienciesInputSchema).array(),z.lazy(() => ClassUncheckedCreateWithoutProficienciesInputSchema),z.lazy(() => ClassUncheckedCreateWithoutProficienciesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ClassCreateOrConnectWithoutProficienciesInputSchema),z.lazy(() => ClassCreateOrConnectWithoutProficienciesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ClassUpsertWithWhereUniqueWithoutProficienciesInputSchema),z.lazy(() => ClassUpsertWithWhereUniqueWithoutProficienciesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ClassWhereUniqueInputSchema),z.lazy(() => ClassWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ClassWhereUniqueInputSchema),z.lazy(() => ClassWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ClassWhereUniqueInputSchema),z.lazy(() => ClassWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ClassWhereUniqueInputSchema),z.lazy(() => ClassWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ClassUpdateWithWhereUniqueWithoutProficienciesInputSchema),z.lazy(() => ClassUpdateWithWhereUniqueWithoutProficienciesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ClassUpdateManyWithWhereWithoutProficienciesInputSchema),z.lazy(() => ClassUpdateManyWithWhereWithoutProficienciesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ClassScalarWhereInputSchema),z.lazy(() => ClassScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const AreaOfEffectWhereInputSchema: z.ZodType<Prisma.AreaOfEffectWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AreaOfEffectWhereInputSchema),z.lazy(() => AreaOfEffectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AreaOfEffectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AreaOfEffectWhereInputSchema),z.lazy(() => AreaOfEffectWhereInputSchema).array() ]).optional(),
  size: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumAOETypeFilterSchema),z.lazy(() => AOETypeSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const DifficultyClassWhereInputSchema: z.ZodType<Prisma.DifficultyClassWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DifficultyClassWhereInputSchema),z.lazy(() => DifficultyClassWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DifficultyClassWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DifficultyClassWhereInputSchema),z.lazy(() => DifficultyClassWhereInputSchema).array() ]).optional(),
  dc_success: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dc_type: z.union([ z.lazy(() => APIReferenceCompositeFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema) ]).optional(),
  desc: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const APIReferenceWhereInputSchema: z.ZodType<Prisma.APIReferenceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => APIReferenceWhereInputSchema),z.lazy(() => APIReferenceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => APIReferenceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => APIReferenceWhereInputSchema),z.lazy(() => APIReferenceWhereInputSchema).array() ]).optional(),
  index: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional().nullable(),
  not: InputJsonValueSchema.optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const MulticlassingWhereInputSchema: z.ZodType<Prisma.MulticlassingWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MulticlassingWhereInputSchema),z.lazy(() => MulticlassingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MulticlassingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MulticlassingWhereInputSchema),z.lazy(() => MulticlassingWhereInputSchema).array() ]).optional(),
  prerequisites: z.union([ z.lazy(() => PrerequisiteCompositeListFilterSchema),z.lazy(() => PrerequisiteObjectEqualityInputSchema).array() ]).optional(),
  prerequisite_options: z.lazy(() => JsonNullableFilterSchema).optional(),
  proficiencies: z.union([ z.lazy(() => APIReferenceCompositeListFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema).array() ]).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceCompositeListFilterSchema),z.lazy(() => ChoiceObjectEqualityInputSchema).array() ]).optional(),
}).strict();

export const PrerequisiteObjectEqualityInputSchema: z.ZodType<Prisma.PrerequisiteObjectEqualityInput> = z.object({
  ability_score: z.lazy(() => APIReferenceObjectEqualityInputSchema).optional().nullable(),
  minimum_score: z.number().optional().nullable()
}).strict();

export const StartingEquipmentWhereInputSchema: z.ZodType<Prisma.StartingEquipmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StartingEquipmentWhereInputSchema),z.lazy(() => StartingEquipmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StartingEquipmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StartingEquipmentWhereInputSchema),z.lazy(() => StartingEquipmentWhereInputSchema).array() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  equipment: z.union([ z.lazy(() => APIReferenceCompositeFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema) ]).optional(),
}).strict();

export const ChoiceWhereInputSchema: z.ZodType<Prisma.ChoiceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChoiceWhereInputSchema),z.lazy(() => ChoiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChoiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChoiceWhereInputSchema),z.lazy(() => ChoiceWhereInputSchema).array() ]).optional(),
  desc: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  choose: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  from: z.lazy(() => JsonNullableFilterSchema).optional()
}).strict();

export const PrerequisiteOrderByCompositeAggregateInputSchema: z.ZodType<Prisma.PrerequisiteOrderByCompositeAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AbilityBonusWhereInputSchema: z.ZodType<Prisma.AbilityBonusWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AbilityBonusWhereInputSchema),z.lazy(() => AbilityBonusWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AbilityBonusWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AbilityBonusWhereInputSchema),z.lazy(() => AbilityBonusWhereInputSchema).array() ]).optional(),
  bonus: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ability_score: z.union([ z.lazy(() => APIReferenceCompositeFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema) ]).optional(),
}).strict();

export const SpellbookCreateWithoutAuth_userInputSchema: z.ZodType<Prisma.SpellbookCreateWithoutAuth_userInput> = z.object({
  id: z.string().optional(),
  spellbook_name: z.string(),
  character_name: z.string(),
  spellbook_description: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  spells: z.lazy(() => SpellCreateNestedManyWithoutSpellbooksInputSchema).optional(),
  classes: z.lazy(() => ClassCreateNestedManyWithoutSpellbooksInputSchema).optional(),
  races: z.lazy(() => RaceCreateNestedManyWithoutSpellbooksInputSchema).optional()
}).strict();

export const SpellbookUncheckedCreateWithoutAuth_userInputSchema: z.ZodType<Prisma.SpellbookUncheckedCreateWithoutAuth_userInput> = z.object({
  id: z.string().optional(),
  spellbook_name: z.string(),
  character_name: z.string(),
  spellbook_description: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  spell_ids: z.union([ z.lazy(() => SpellbookCreatespell_idsInputSchema),z.string().array() ]).optional(),
  class_ids: z.union([ z.lazy(() => SpellbookCreateclass_idsInputSchema),z.string().array() ]).optional(),
  race_ids: z.union([ z.lazy(() => SpellbookCreaterace_idsInputSchema),z.string().array() ]).optional(),
  spells: z.lazy(() => SpellUncheckedCreateNestedManyWithoutSpellbooksInputSchema).optional(),
  classes: z.lazy(() => ClassUncheckedCreateNestedManyWithoutSpellbooksInputSchema).optional(),
  races: z.lazy(() => RaceUncheckedCreateNestedManyWithoutSpellbooksInputSchema).optional()
}).strict();

export const SpellbookCreateOrConnectWithoutAuth_userInputSchema: z.ZodType<Prisma.SpellbookCreateOrConnectWithoutAuth_userInput> = z.object({
  where: z.lazy(() => SpellbookWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SpellbookCreateWithoutAuth_userInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutAuth_userInputSchema) ]),
}).strict();

export const SpellbookCreateManyAuth_userInputEnvelopeSchema: z.ZodType<Prisma.SpellbookCreateManyAuth_userInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SpellbookCreateManyAuth_userInputSchema),z.lazy(() => SpellbookCreateManyAuth_userInputSchema).array() ]),
}).strict();

export const SpellbookUpsertWithWhereUniqueWithoutAuth_userInputSchema: z.ZodType<Prisma.SpellbookUpsertWithWhereUniqueWithoutAuth_userInput> = z.object({
  where: z.lazy(() => SpellbookWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SpellbookUpdateWithoutAuth_userInputSchema),z.lazy(() => SpellbookUncheckedUpdateWithoutAuth_userInputSchema) ]),
  create: z.union([ z.lazy(() => SpellbookCreateWithoutAuth_userInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutAuth_userInputSchema) ]),
}).strict();

export const SpellbookUpdateWithWhereUniqueWithoutAuth_userInputSchema: z.ZodType<Prisma.SpellbookUpdateWithWhereUniqueWithoutAuth_userInput> = z.object({
  where: z.lazy(() => SpellbookWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SpellbookUpdateWithoutAuth_userInputSchema),z.lazy(() => SpellbookUncheckedUpdateWithoutAuth_userInputSchema) ]),
}).strict();

export const SpellbookUpdateManyWithWhereWithoutAuth_userInputSchema: z.ZodType<Prisma.SpellbookUpdateManyWithWhereWithoutAuth_userInput> = z.object({
  where: z.lazy(() => SpellbookScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SpellbookUpdateManyMutationInputSchema),z.lazy(() => SpellbookUncheckedUpdateManyWithoutAuth_userInputSchema) ]),
}).strict();

export const SpellbookScalarWhereInputSchema: z.ZodType<Prisma.SpellbookScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SpellbookScalarWhereInputSchema),z.lazy(() => SpellbookScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpellbookScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpellbookScalarWhereInputSchema),z.lazy(() => SpellbookScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  spellbook_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  character_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  spellbook_description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  spell_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  class_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  race_ids: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const UserCreateWithoutSpellbooksInputSchema: z.ZodType<Prisma.UserCreateWithoutSpellbooksInput> = z.object({
  id: z.string().optional(),
  username: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  biography: z.string().optional().nullable()
}).strict();

export const UserUncheckedCreateWithoutSpellbooksInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSpellbooksInput> = z.object({
  id: z.string().optional(),
  username: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  biography: z.string().optional().nullable()
}).strict();

export const UserCreateOrConnectWithoutSpellbooksInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSpellbooksInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSpellbooksInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpellbooksInputSchema) ]),
}).strict();

export const SpellCreateWithoutSpellbooksInputSchema: z.ZodType<Prisma.SpellCreateWithoutSpellbooksInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  desc: z.union([ z.lazy(() => SpellCreatedescInputSchema),z.string().array() ]).optional(),
  higher_level: z.union([ z.lazy(() => SpellCreatehigher_levelInputSchema),z.string().array() ]).optional(),
  range: z.string(),
  components: z.union([ z.lazy(() => SpellCreatecomponentsInputSchema),z.lazy(() => ComponentsSchema).array() ]).optional(),
  material: z.string().optional().nullable(),
  area_of_effect: z.union([ z.lazy(() => AreaOfEffectNullableCreateEnvelopeInputSchema),z.lazy(() => AreaOfEffectCreateInputSchema) ]).optional().nullable(),
  ritual: z.boolean(),
  duration: z.string(),
  concentration: z.boolean(),
  casting_time: z.string(),
  level: z.number().int(),
  attack_type: z.string().optional().nullable(),
  damage: InputJsonValueSchema.optional().nullable(),
  dc: z.union([ z.lazy(() => DifficultyClassNullableCreateEnvelopeInputSchema),z.lazy(() => DifficultyClassCreateInputSchema) ]).optional().nullable(),
  school: z.union([ z.lazy(() => APIReferenceCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]),
  classes: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
}).strict();

export const SpellUncheckedCreateWithoutSpellbooksInputSchema: z.ZodType<Prisma.SpellUncheckedCreateWithoutSpellbooksInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  desc: z.union([ z.lazy(() => SpellCreatedescInputSchema),z.string().array() ]).optional(),
  higher_level: z.union([ z.lazy(() => SpellCreatehigher_levelInputSchema),z.string().array() ]).optional(),
  range: z.string(),
  components: z.union([ z.lazy(() => SpellCreatecomponentsInputSchema),z.lazy(() => ComponentsSchema).array() ]).optional(),
  material: z.string().optional().nullable(),
  area_of_effect: z.union([ z.lazy(() => AreaOfEffectNullableCreateEnvelopeInputSchema),z.lazy(() => AreaOfEffectCreateInputSchema) ]).optional().nullable(),
  ritual: z.boolean(),
  duration: z.string(),
  concentration: z.boolean(),
  casting_time: z.string(),
  level: z.number().int(),
  attack_type: z.string().optional().nullable(),
  damage: InputJsonValueSchema.optional().nullable(),
  dc: z.union([ z.lazy(() => DifficultyClassNullableCreateEnvelopeInputSchema),z.lazy(() => DifficultyClassCreateInputSchema) ]).optional().nullable(),
  school: z.union([ z.lazy(() => APIReferenceCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]),
  classes: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => SpellCreatespellbook_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const SpellCreateOrConnectWithoutSpellbooksInputSchema: z.ZodType<Prisma.SpellCreateOrConnectWithoutSpellbooksInput> = z.object({
  where: z.lazy(() => SpellWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SpellCreateWithoutSpellbooksInputSchema),z.lazy(() => SpellUncheckedCreateWithoutSpellbooksInputSchema) ]),
}).strict();

export const ClassCreateWithoutSpellbooksInputSchema: z.ZodType<Prisma.ClassCreateWithoutSpellbooksInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  hit_die: z.number().int(),
  class_levels: z.string(),
  multi_classing: z.union([ z.lazy(() => MulticlassingNullableCreateEnvelopeInputSchema),z.lazy(() => MulticlassingCreateInputSchema) ]).optional().nullable(),
  spells: z.string().optional().nullable(),
  starting_equipment: z.union([ z.lazy(() => StartingEquipmentListCreateEnvelopeInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema).array() ]).optional(),
  starting_equipment_options: z.union([ z.lazy(() => ChoiceListCreateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceListCreateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  saving_throws: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  proficiencies: z.lazy(() => ProficiencyCreateNestedManyWithoutClassesInputSchema).optional()
}).strict();

export const ClassUncheckedCreateWithoutSpellbooksInputSchema: z.ZodType<Prisma.ClassUncheckedCreateWithoutSpellbooksInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  hit_die: z.number().int(),
  class_levels: z.string(),
  multi_classing: z.union([ z.lazy(() => MulticlassingNullableCreateEnvelopeInputSchema),z.lazy(() => MulticlassingCreateInputSchema) ]).optional().nullable(),
  spells: z.string().optional().nullable(),
  starting_equipment: z.union([ z.lazy(() => StartingEquipmentListCreateEnvelopeInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema).array() ]).optional(),
  starting_equipment_options: z.union([ z.lazy(() => ChoiceListCreateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  proficiency_ids: z.union([ z.lazy(() => ClassCreateproficiency_idsInputSchema),z.string().array() ]).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceListCreateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  saving_throws: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => ClassCreatespellbook_idsInputSchema),z.string().array() ]).optional(),
  proficiencies: z.lazy(() => ProficiencyUncheckedCreateNestedManyWithoutClassesInputSchema).optional()
}).strict();

export const ClassCreateOrConnectWithoutSpellbooksInputSchema: z.ZodType<Prisma.ClassCreateOrConnectWithoutSpellbooksInput> = z.object({
  where: z.lazy(() => ClassWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ClassCreateWithoutSpellbooksInputSchema),z.lazy(() => ClassUncheckedCreateWithoutSpellbooksInputSchema) ]),
}).strict();

export const RaceCreateWithoutSpellbooksInputSchema: z.ZodType<Prisma.RaceCreateWithoutSpellbooksInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  speed: z.number().int(),
  ability_bonuses: z.union([ z.lazy(() => AbilityBonusListCreateEnvelopeInputSchema),z.lazy(() => AbilityBonusCreateInputSchema),z.lazy(() => AbilityBonusCreateInputSchema).array() ]).optional(),
  alignment: z.string(),
  age: z.string(),
  size: z.string(),
  size_description: z.string(),
  starting_proficiencies: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  starting_proficiency_options: z.union([ z.lazy(() => ChoiceNullableCreateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  language_desc: z.string(),
  traits: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subraces: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
}).strict();

export const RaceUncheckedCreateWithoutSpellbooksInputSchema: z.ZodType<Prisma.RaceUncheckedCreateWithoutSpellbooksInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  speed: z.number().int(),
  ability_bonuses: z.union([ z.lazy(() => AbilityBonusListCreateEnvelopeInputSchema),z.lazy(() => AbilityBonusCreateInputSchema),z.lazy(() => AbilityBonusCreateInputSchema).array() ]).optional(),
  alignment: z.string(),
  age: z.string(),
  size: z.string(),
  size_description: z.string(),
  starting_proficiencies: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  starting_proficiency_options: z.union([ z.lazy(() => ChoiceNullableCreateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  language_desc: z.string(),
  traits: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subraces: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => RaceCreatespellbook_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const RaceCreateOrConnectWithoutSpellbooksInputSchema: z.ZodType<Prisma.RaceCreateOrConnectWithoutSpellbooksInput> = z.object({
  where: z.lazy(() => RaceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RaceCreateWithoutSpellbooksInputSchema),z.lazy(() => RaceUncheckedCreateWithoutSpellbooksInputSchema) ]),
}).strict();

export const UserUpsertWithoutSpellbooksInputSchema: z.ZodType<Prisma.UserUpsertWithoutSpellbooksInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSpellbooksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSpellbooksInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSpellbooksInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpellbooksInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSpellbooksInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSpellbooksInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSpellbooksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSpellbooksInputSchema) ]),
}).strict();

export const UserUpdateWithoutSpellbooksInputSchema: z.ZodType<Prisma.UserUpdateWithoutSpellbooksInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  biography: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateWithoutSpellbooksInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSpellbooksInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  biography: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SpellUpsertWithWhereUniqueWithoutSpellbooksInputSchema: z.ZodType<Prisma.SpellUpsertWithWhereUniqueWithoutSpellbooksInput> = z.object({
  where: z.lazy(() => SpellWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SpellUpdateWithoutSpellbooksInputSchema),z.lazy(() => SpellUncheckedUpdateWithoutSpellbooksInputSchema) ]),
  create: z.union([ z.lazy(() => SpellCreateWithoutSpellbooksInputSchema),z.lazy(() => SpellUncheckedCreateWithoutSpellbooksInputSchema) ]),
}).strict();

export const SpellUpdateWithWhereUniqueWithoutSpellbooksInputSchema: z.ZodType<Prisma.SpellUpdateWithWhereUniqueWithoutSpellbooksInput> = z.object({
  where: z.lazy(() => SpellWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SpellUpdateWithoutSpellbooksInputSchema),z.lazy(() => SpellUncheckedUpdateWithoutSpellbooksInputSchema) ]),
}).strict();

export const SpellUpdateManyWithWhereWithoutSpellbooksInputSchema: z.ZodType<Prisma.SpellUpdateManyWithWhereWithoutSpellbooksInput> = z.object({
  where: z.lazy(() => SpellScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SpellUpdateManyMutationInputSchema),z.lazy(() => SpellUncheckedUpdateManyWithoutSpellbooksInputSchema) ]),
}).strict();

export const SpellScalarWhereInputSchema: z.ZodType<Prisma.SpellScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SpellScalarWhereInputSchema),z.lazy(() => SpellScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpellScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpellScalarWhereInputSchema),z.lazy(() => SpellScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  desc: z.lazy(() => StringNullableListFilterSchema).optional(),
  higher_level: z.lazy(() => StringNullableListFilterSchema).optional(),
  range: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  components: z.lazy(() => EnumComponentsNullableListFilterSchema).optional(),
  material: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ritual: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  duration: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  concentration: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  casting_time: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  level: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  attack_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  damage: z.lazy(() => JsonNullableFilterSchema).optional(),
  spellbook_ids: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const ClassUpsertWithWhereUniqueWithoutSpellbooksInputSchema: z.ZodType<Prisma.ClassUpsertWithWhereUniqueWithoutSpellbooksInput> = z.object({
  where: z.lazy(() => ClassWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ClassUpdateWithoutSpellbooksInputSchema),z.lazy(() => ClassUncheckedUpdateWithoutSpellbooksInputSchema) ]),
  create: z.union([ z.lazy(() => ClassCreateWithoutSpellbooksInputSchema),z.lazy(() => ClassUncheckedCreateWithoutSpellbooksInputSchema) ]),
}).strict();

export const ClassUpdateWithWhereUniqueWithoutSpellbooksInputSchema: z.ZodType<Prisma.ClassUpdateWithWhereUniqueWithoutSpellbooksInput> = z.object({
  where: z.lazy(() => ClassWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ClassUpdateWithoutSpellbooksInputSchema),z.lazy(() => ClassUncheckedUpdateWithoutSpellbooksInputSchema) ]),
}).strict();

export const ClassUpdateManyWithWhereWithoutSpellbooksInputSchema: z.ZodType<Prisma.ClassUpdateManyWithWhereWithoutSpellbooksInput> = z.object({
  where: z.lazy(() => ClassScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ClassUpdateManyMutationInputSchema),z.lazy(() => ClassUncheckedUpdateManyWithoutSpellbooksInputSchema) ]),
}).strict();

export const ClassScalarWhereInputSchema: z.ZodType<Prisma.ClassScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ClassScalarWhereInputSchema),z.lazy(() => ClassScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClassScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClassScalarWhereInputSchema),z.lazy(() => ClassScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hit_die: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  class_levels: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  spells: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  proficiency_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  spellbook_ids: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const RaceUpsertWithWhereUniqueWithoutSpellbooksInputSchema: z.ZodType<Prisma.RaceUpsertWithWhereUniqueWithoutSpellbooksInput> = z.object({
  where: z.lazy(() => RaceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RaceUpdateWithoutSpellbooksInputSchema),z.lazy(() => RaceUncheckedUpdateWithoutSpellbooksInputSchema) ]),
  create: z.union([ z.lazy(() => RaceCreateWithoutSpellbooksInputSchema),z.lazy(() => RaceUncheckedCreateWithoutSpellbooksInputSchema) ]),
}).strict();

export const RaceUpdateWithWhereUniqueWithoutSpellbooksInputSchema: z.ZodType<Prisma.RaceUpdateWithWhereUniqueWithoutSpellbooksInput> = z.object({
  where: z.lazy(() => RaceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RaceUpdateWithoutSpellbooksInputSchema),z.lazy(() => RaceUncheckedUpdateWithoutSpellbooksInputSchema) ]),
}).strict();

export const RaceUpdateManyWithWhereWithoutSpellbooksInputSchema: z.ZodType<Prisma.RaceUpdateManyWithWhereWithoutSpellbooksInput> = z.object({
  where: z.lazy(() => RaceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RaceUpdateManyMutationInputSchema),z.lazy(() => RaceUncheckedUpdateManyWithoutSpellbooksInputSchema) ]),
}).strict();

export const RaceScalarWhereInputSchema: z.ZodType<Prisma.RaceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RaceScalarWhereInputSchema),z.lazy(() => RaceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RaceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RaceScalarWhereInputSchema),z.lazy(() => RaceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  speed: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  alignment: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  age: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size_description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  language_desc: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  spellbook_ids: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const SpellbookCreateWithoutSpellsInputSchema: z.ZodType<Prisma.SpellbookCreateWithoutSpellsInput> = z.object({
  id: z.string().optional(),
  spellbook_name: z.string(),
  character_name: z.string(),
  spellbook_description: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  auth_user: z.lazy(() => UserCreateNestedOneWithoutSpellbooksInputSchema),
  classes: z.lazy(() => ClassCreateNestedManyWithoutSpellbooksInputSchema).optional(),
  races: z.lazy(() => RaceCreateNestedManyWithoutSpellbooksInputSchema).optional()
}).strict();

export const SpellbookUncheckedCreateWithoutSpellsInputSchema: z.ZodType<Prisma.SpellbookUncheckedCreateWithoutSpellsInput> = z.object({
  id: z.string().optional(),
  spellbook_name: z.string(),
  character_name: z.string(),
  spellbook_description: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  user_id: z.string(),
  spell_ids: z.union([ z.lazy(() => SpellbookCreatespell_idsInputSchema),z.string().array() ]).optional(),
  class_ids: z.union([ z.lazy(() => SpellbookCreateclass_idsInputSchema),z.string().array() ]).optional(),
  race_ids: z.union([ z.lazy(() => SpellbookCreaterace_idsInputSchema),z.string().array() ]).optional(),
  classes: z.lazy(() => ClassUncheckedCreateNestedManyWithoutSpellbooksInputSchema).optional(),
  races: z.lazy(() => RaceUncheckedCreateNestedManyWithoutSpellbooksInputSchema).optional()
}).strict();

export const SpellbookCreateOrConnectWithoutSpellsInputSchema: z.ZodType<Prisma.SpellbookCreateOrConnectWithoutSpellsInput> = z.object({
  where: z.lazy(() => SpellbookWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SpellbookCreateWithoutSpellsInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutSpellsInputSchema) ]),
}).strict();

export const AreaOfEffectUpsertInputSchema: z.ZodType<Prisma.AreaOfEffectUpsertInput> = z.object({
  set: z.lazy(() => AreaOfEffectCreateInputSchema).nullable(),
  update: z.lazy(() => AreaOfEffectUpdateInputSchema)
}).strict();

export const DifficultyClassUpsertInputSchema: z.ZodType<Prisma.DifficultyClassUpsertInput> = z.object({
  set: z.lazy(() => DifficultyClassCreateInputSchema).nullable(),
  update: z.lazy(() => DifficultyClassUpdateInputSchema)
}).strict();

export const APIReferenceUpdateInputSchema: z.ZodType<Prisma.APIReferenceUpdateInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const APIReferenceUpdateManyInputSchema: z.ZodType<Prisma.APIReferenceUpdateManyInput> = z.object({
  where: z.lazy(() => APIReferenceWhereInputSchema),
  data: z.lazy(() => APIReferenceUpdateInputSchema)
}).strict();

export const APIReferenceDeleteManyInputSchema: z.ZodType<Prisma.APIReferenceDeleteManyInput> = z.object({
  where: z.lazy(() => APIReferenceWhereInputSchema)
}).strict();

export const SpellbookUpsertWithWhereUniqueWithoutSpellsInputSchema: z.ZodType<Prisma.SpellbookUpsertWithWhereUniqueWithoutSpellsInput> = z.object({
  where: z.lazy(() => SpellbookWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SpellbookUpdateWithoutSpellsInputSchema),z.lazy(() => SpellbookUncheckedUpdateWithoutSpellsInputSchema) ]),
  create: z.union([ z.lazy(() => SpellbookCreateWithoutSpellsInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutSpellsInputSchema) ]),
}).strict();

export const SpellbookUpdateWithWhereUniqueWithoutSpellsInputSchema: z.ZodType<Prisma.SpellbookUpdateWithWhereUniqueWithoutSpellsInput> = z.object({
  where: z.lazy(() => SpellbookWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SpellbookUpdateWithoutSpellsInputSchema),z.lazy(() => SpellbookUncheckedUpdateWithoutSpellsInputSchema) ]),
}).strict();

export const SpellbookUpdateManyWithWhereWithoutSpellsInputSchema: z.ZodType<Prisma.SpellbookUpdateManyWithWhereWithoutSpellsInput> = z.object({
  where: z.lazy(() => SpellbookScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SpellbookUpdateManyMutationInputSchema),z.lazy(() => SpellbookUncheckedUpdateManyWithoutSpellsInputSchema) ]),
}).strict();

export const PrerequisiteCreateInputSchema: z.ZodType<Prisma.PrerequisiteCreateInput> = z.object({
  ability_score: z.lazy(() => APIReferenceCreateInputSchema).optional().nullable(),
  minimum_score: z.number().optional().nullable()
}).strict();

export const ProficiencyCreateWithoutClassesInputSchema: z.ZodType<Prisma.ProficiencyCreateWithoutClassesInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  type: z.string(),
  race_ids: z.union([ z.lazy(() => ProficiencyCreaterace_idsInputSchema),z.string().array() ]).optional(),
  reference: z.union([ z.lazy(() => APIReferenceCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]),
}).strict();

export const ProficiencyUncheckedCreateWithoutClassesInputSchema: z.ZodType<Prisma.ProficiencyUncheckedCreateWithoutClassesInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  type: z.string(),
  race_ids: z.union([ z.lazy(() => ProficiencyCreaterace_idsInputSchema),z.string().array() ]).optional(),
  reference: z.union([ z.lazy(() => APIReferenceCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]),
  class_ids: z.union([ z.lazy(() => ProficiencyCreateclass_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const ProficiencyCreateOrConnectWithoutClassesInputSchema: z.ZodType<Prisma.ProficiencyCreateOrConnectWithoutClassesInput> = z.object({
  where: z.lazy(() => ProficiencyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProficiencyCreateWithoutClassesInputSchema),z.lazy(() => ProficiencyUncheckedCreateWithoutClassesInputSchema) ]),
}).strict();

export const SpellbookCreateWithoutClassesInputSchema: z.ZodType<Prisma.SpellbookCreateWithoutClassesInput> = z.object({
  id: z.string().optional(),
  spellbook_name: z.string(),
  character_name: z.string(),
  spellbook_description: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  auth_user: z.lazy(() => UserCreateNestedOneWithoutSpellbooksInputSchema),
  spells: z.lazy(() => SpellCreateNestedManyWithoutSpellbooksInputSchema).optional(),
  races: z.lazy(() => RaceCreateNestedManyWithoutSpellbooksInputSchema).optional()
}).strict();

export const SpellbookUncheckedCreateWithoutClassesInputSchema: z.ZodType<Prisma.SpellbookUncheckedCreateWithoutClassesInput> = z.object({
  id: z.string().optional(),
  spellbook_name: z.string(),
  character_name: z.string(),
  spellbook_description: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  user_id: z.string(),
  spell_ids: z.union([ z.lazy(() => SpellbookCreatespell_idsInputSchema),z.string().array() ]).optional(),
  class_ids: z.union([ z.lazy(() => SpellbookCreateclass_idsInputSchema),z.string().array() ]).optional(),
  race_ids: z.union([ z.lazy(() => SpellbookCreaterace_idsInputSchema),z.string().array() ]).optional(),
  spells: z.lazy(() => SpellUncheckedCreateNestedManyWithoutSpellbooksInputSchema).optional(),
  races: z.lazy(() => RaceUncheckedCreateNestedManyWithoutSpellbooksInputSchema).optional()
}).strict();

export const SpellbookCreateOrConnectWithoutClassesInputSchema: z.ZodType<Prisma.SpellbookCreateOrConnectWithoutClassesInput> = z.object({
  where: z.lazy(() => SpellbookWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SpellbookCreateWithoutClassesInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutClassesInputSchema) ]),
}).strict();

export const MulticlassingUpsertInputSchema: z.ZodType<Prisma.MulticlassingUpsertInput> = z.object({
  set: z.lazy(() => MulticlassingCreateInputSchema).nullable(),
  update: z.lazy(() => MulticlassingUpdateInputSchema)
}).strict();

export const StartingEquipmentUpdateManyInputSchema: z.ZodType<Prisma.StartingEquipmentUpdateManyInput> = z.object({
  where: z.lazy(() => StartingEquipmentWhereInputSchema),
  data: z.lazy(() => StartingEquipmentUpdateInputSchema)
}).strict();

export const StartingEquipmentDeleteManyInputSchema: z.ZodType<Prisma.StartingEquipmentDeleteManyInput> = z.object({
  where: z.lazy(() => StartingEquipmentWhereInputSchema)
}).strict();

export const ChoiceUpdateManyInputSchema: z.ZodType<Prisma.ChoiceUpdateManyInput> = z.object({
  where: z.lazy(() => ChoiceWhereInputSchema),
  data: z.lazy(() => ChoiceUpdateInputSchema)
}).strict();

export const ChoiceDeleteManyInputSchema: z.ZodType<Prisma.ChoiceDeleteManyInput> = z.object({
  where: z.lazy(() => ChoiceWhereInputSchema)
}).strict();

export const ProficiencyUpsertWithWhereUniqueWithoutClassesInputSchema: z.ZodType<Prisma.ProficiencyUpsertWithWhereUniqueWithoutClassesInput> = z.object({
  where: z.lazy(() => ProficiencyWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProficiencyUpdateWithoutClassesInputSchema),z.lazy(() => ProficiencyUncheckedUpdateWithoutClassesInputSchema) ]),
  create: z.union([ z.lazy(() => ProficiencyCreateWithoutClassesInputSchema),z.lazy(() => ProficiencyUncheckedCreateWithoutClassesInputSchema) ]),
}).strict();

export const ProficiencyUpdateWithWhereUniqueWithoutClassesInputSchema: z.ZodType<Prisma.ProficiencyUpdateWithWhereUniqueWithoutClassesInput> = z.object({
  where: z.lazy(() => ProficiencyWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProficiencyUpdateWithoutClassesInputSchema),z.lazy(() => ProficiencyUncheckedUpdateWithoutClassesInputSchema) ]),
}).strict();

export const ProficiencyUpdateManyWithWhereWithoutClassesInputSchema: z.ZodType<Prisma.ProficiencyUpdateManyWithWhereWithoutClassesInput> = z.object({
  where: z.lazy(() => ProficiencyScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProficiencyUpdateManyMutationInputSchema),z.lazy(() => ProficiencyUncheckedUpdateManyWithoutClassesInputSchema) ]),
}).strict();

export const ProficiencyScalarWhereInputSchema: z.ZodType<Prisma.ProficiencyScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProficiencyScalarWhereInputSchema),z.lazy(() => ProficiencyScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProficiencyScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProficiencyScalarWhereInputSchema),z.lazy(() => ProficiencyScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  race_ids: z.lazy(() => StringNullableListFilterSchema).optional(),
  class_ids: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const SpellbookUpsertWithWhereUniqueWithoutClassesInputSchema: z.ZodType<Prisma.SpellbookUpsertWithWhereUniqueWithoutClassesInput> = z.object({
  where: z.lazy(() => SpellbookWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SpellbookUpdateWithoutClassesInputSchema),z.lazy(() => SpellbookUncheckedUpdateWithoutClassesInputSchema) ]),
  create: z.union([ z.lazy(() => SpellbookCreateWithoutClassesInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutClassesInputSchema) ]),
}).strict();

export const SpellbookUpdateWithWhereUniqueWithoutClassesInputSchema: z.ZodType<Prisma.SpellbookUpdateWithWhereUniqueWithoutClassesInput> = z.object({
  where: z.lazy(() => SpellbookWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SpellbookUpdateWithoutClassesInputSchema),z.lazy(() => SpellbookUncheckedUpdateWithoutClassesInputSchema) ]),
}).strict();

export const SpellbookUpdateManyWithWhereWithoutClassesInputSchema: z.ZodType<Prisma.SpellbookUpdateManyWithWhereWithoutClassesInput> = z.object({
  where: z.lazy(() => SpellbookScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SpellbookUpdateManyMutationInputSchema),z.lazy(() => SpellbookUncheckedUpdateManyWithoutClassesInputSchema) ]),
}).strict();

export const SpellbookCreateWithoutRacesInputSchema: z.ZodType<Prisma.SpellbookCreateWithoutRacesInput> = z.object({
  id: z.string().optional(),
  spellbook_name: z.string(),
  character_name: z.string(),
  spellbook_description: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  auth_user: z.lazy(() => UserCreateNestedOneWithoutSpellbooksInputSchema),
  spells: z.lazy(() => SpellCreateNestedManyWithoutSpellbooksInputSchema).optional(),
  classes: z.lazy(() => ClassCreateNestedManyWithoutSpellbooksInputSchema).optional()
}).strict();

export const SpellbookUncheckedCreateWithoutRacesInputSchema: z.ZodType<Prisma.SpellbookUncheckedCreateWithoutRacesInput> = z.object({
  id: z.string().optional(),
  spellbook_name: z.string(),
  character_name: z.string(),
  spellbook_description: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  user_id: z.string(),
  spell_ids: z.union([ z.lazy(() => SpellbookCreatespell_idsInputSchema),z.string().array() ]).optional(),
  class_ids: z.union([ z.lazy(() => SpellbookCreateclass_idsInputSchema),z.string().array() ]).optional(),
  race_ids: z.union([ z.lazy(() => SpellbookCreaterace_idsInputSchema),z.string().array() ]).optional(),
  spells: z.lazy(() => SpellUncheckedCreateNestedManyWithoutSpellbooksInputSchema).optional(),
  classes: z.lazy(() => ClassUncheckedCreateNestedManyWithoutSpellbooksInputSchema).optional()
}).strict();

export const SpellbookCreateOrConnectWithoutRacesInputSchema: z.ZodType<Prisma.SpellbookCreateOrConnectWithoutRacesInput> = z.object({
  where: z.lazy(() => SpellbookWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SpellbookCreateWithoutRacesInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutRacesInputSchema) ]),
}).strict();

export const AbilityBonusUpdateManyInputSchema: z.ZodType<Prisma.AbilityBonusUpdateManyInput> = z.object({
  where: z.lazy(() => AbilityBonusWhereInputSchema),
  data: z.lazy(() => AbilityBonusUpdateInputSchema)
}).strict();

export const AbilityBonusDeleteManyInputSchema: z.ZodType<Prisma.AbilityBonusDeleteManyInput> = z.object({
  where: z.lazy(() => AbilityBonusWhereInputSchema)
}).strict();

export const ChoiceUpsertInputSchema: z.ZodType<Prisma.ChoiceUpsertInput> = z.object({
  set: z.lazy(() => ChoiceCreateInputSchema).nullable(),
  update: z.lazy(() => ChoiceUpdateInputSchema)
}).strict();

export const SpellbookUpsertWithWhereUniqueWithoutRacesInputSchema: z.ZodType<Prisma.SpellbookUpsertWithWhereUniqueWithoutRacesInput> = z.object({
  where: z.lazy(() => SpellbookWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SpellbookUpdateWithoutRacesInputSchema),z.lazy(() => SpellbookUncheckedUpdateWithoutRacesInputSchema) ]),
  create: z.union([ z.lazy(() => SpellbookCreateWithoutRacesInputSchema),z.lazy(() => SpellbookUncheckedCreateWithoutRacesInputSchema) ]),
}).strict();

export const SpellbookUpdateWithWhereUniqueWithoutRacesInputSchema: z.ZodType<Prisma.SpellbookUpdateWithWhereUniqueWithoutRacesInput> = z.object({
  where: z.lazy(() => SpellbookWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SpellbookUpdateWithoutRacesInputSchema),z.lazy(() => SpellbookUncheckedUpdateWithoutRacesInputSchema) ]),
}).strict();

export const SpellbookUpdateManyWithWhereWithoutRacesInputSchema: z.ZodType<Prisma.SpellbookUpdateManyWithWhereWithoutRacesInput> = z.object({
  where: z.lazy(() => SpellbookScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SpellbookUpdateManyMutationInputSchema),z.lazy(() => SpellbookUncheckedUpdateManyWithoutRacesInputSchema) ]),
}).strict();

export const ClassCreateWithoutProficienciesInputSchema: z.ZodType<Prisma.ClassCreateWithoutProficienciesInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  hit_die: z.number().int(),
  class_levels: z.string(),
  multi_classing: z.union([ z.lazy(() => MulticlassingNullableCreateEnvelopeInputSchema),z.lazy(() => MulticlassingCreateInputSchema) ]).optional().nullable(),
  spells: z.string().optional().nullable(),
  starting_equipment: z.union([ z.lazy(() => StartingEquipmentListCreateEnvelopeInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema).array() ]).optional(),
  starting_equipment_options: z.union([ z.lazy(() => ChoiceListCreateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceListCreateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  saving_throws: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbooks: z.lazy(() => SpellbookCreateNestedManyWithoutClassesInputSchema).optional()
}).strict();

export const ClassUncheckedCreateWithoutProficienciesInputSchema: z.ZodType<Prisma.ClassUncheckedCreateWithoutProficienciesInput> = z.object({
  id: z.string().optional(),
  index: z.string(),
  name: z.string(),
  url: z.string(),
  hit_die: z.number().int(),
  class_levels: z.string(),
  multi_classing: z.union([ z.lazy(() => MulticlassingNullableCreateEnvelopeInputSchema),z.lazy(() => MulticlassingCreateInputSchema) ]).optional().nullable(),
  spells: z.string().optional().nullable(),
  starting_equipment: z.union([ z.lazy(() => StartingEquipmentListCreateEnvelopeInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema).array() ]).optional(),
  starting_equipment_options: z.union([ z.lazy(() => ChoiceListCreateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  proficiency_ids: z.union([ z.lazy(() => ClassCreateproficiency_idsInputSchema),z.string().array() ]).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceListCreateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  saving_throws: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListCreateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => ClassCreatespellbook_idsInputSchema),z.string().array() ]).optional(),
  spellbooks: z.lazy(() => SpellbookUncheckedCreateNestedManyWithoutClassesInputSchema).optional()
}).strict();

export const ClassCreateOrConnectWithoutProficienciesInputSchema: z.ZodType<Prisma.ClassCreateOrConnectWithoutProficienciesInput> = z.object({
  where: z.lazy(() => ClassWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ClassCreateWithoutProficienciesInputSchema),z.lazy(() => ClassUncheckedCreateWithoutProficienciesInputSchema) ]),
}).strict();

export const ClassUpsertWithWhereUniqueWithoutProficienciesInputSchema: z.ZodType<Prisma.ClassUpsertWithWhereUniqueWithoutProficienciesInput> = z.object({
  where: z.lazy(() => ClassWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ClassUpdateWithoutProficienciesInputSchema),z.lazy(() => ClassUncheckedUpdateWithoutProficienciesInputSchema) ]),
  create: z.union([ z.lazy(() => ClassCreateWithoutProficienciesInputSchema),z.lazy(() => ClassUncheckedCreateWithoutProficienciesInputSchema) ]),
}).strict();

export const ClassUpdateWithWhereUniqueWithoutProficienciesInputSchema: z.ZodType<Prisma.ClassUpdateWithWhereUniqueWithoutProficienciesInput> = z.object({
  where: z.lazy(() => ClassWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ClassUpdateWithoutProficienciesInputSchema),z.lazy(() => ClassUncheckedUpdateWithoutProficienciesInputSchema) ]),
}).strict();

export const ClassUpdateManyWithWhereWithoutProficienciesInputSchema: z.ZodType<Prisma.ClassUpdateManyWithWhereWithoutProficienciesInput> = z.object({
  where: z.lazy(() => ClassScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ClassUpdateManyMutationInputSchema),z.lazy(() => ClassUncheckedUpdateManyWithoutProficienciesInputSchema) ]),
}).strict();

export const EnumAOETypeFilterSchema: z.ZodType<Prisma.EnumAOETypeFilter> = z.object({
  equals: z.lazy(() => AOETypeSchema).optional(),
  in: z.lazy(() => AOETypeSchema).array().optional(),
  notIn: z.lazy(() => AOETypeSchema).array().optional(),
  not: z.union([ z.lazy(() => AOETypeSchema),z.lazy(() => NestedEnumAOETypeFilterSchema) ]).optional(),
}).strict();

export const PrerequisiteCompositeListFilterSchema: z.ZodType<Prisma.PrerequisiteCompositeListFilter> = z.object({
  equals: z.lazy(() => PrerequisiteObjectEqualityInputSchema).array().optional(),
  every: z.lazy(() => PrerequisiteWhereInputSchema).optional(),
  some: z.lazy(() => PrerequisiteWhereInputSchema).optional(),
  none: z.lazy(() => PrerequisiteWhereInputSchema).optional(),
  isEmpty: z.boolean().optional(),
  isSet: z.boolean().optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const SpellbookCreateManyAuth_userInputSchema: z.ZodType<Prisma.SpellbookCreateManyAuth_userInput> = z.object({
  id: z.string().optional(),
  spellbook_name: z.string(),
  character_name: z.string(),
  spellbook_description: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  spell_ids: z.union([ z.lazy(() => SpellbookCreatespell_idsInputSchema),z.string().array() ]).optional(),
  class_ids: z.union([ z.lazy(() => SpellbookCreateclass_idsInputSchema),z.string().array() ]).optional(),
  race_ids: z.union([ z.lazy(() => SpellbookCreaterace_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const SpellbookUpdateWithoutAuth_userInputSchema: z.ZodType<Prisma.SpellbookUpdateWithoutAuth_userInput> = z.object({
  spellbook_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spellbook_description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spells: z.lazy(() => SpellUpdateManyWithoutSpellbooksNestedInputSchema).optional(),
  classes: z.lazy(() => ClassUpdateManyWithoutSpellbooksNestedInputSchema).optional(),
  races: z.lazy(() => RaceUpdateManyWithoutSpellbooksNestedInputSchema).optional()
}).strict();

export const SpellbookUncheckedUpdateWithoutAuth_userInputSchema: z.ZodType<Prisma.SpellbookUncheckedUpdateWithoutAuth_userInput> = z.object({
  spellbook_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spellbook_description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spell_ids: z.union([ z.lazy(() => SpellbookUpdatespell_idsInputSchema),z.string().array() ]).optional(),
  class_ids: z.union([ z.lazy(() => SpellbookUpdateclass_idsInputSchema),z.string().array() ]).optional(),
  race_ids: z.union([ z.lazy(() => SpellbookUpdaterace_idsInputSchema),z.string().array() ]).optional(),
  spells: z.lazy(() => SpellUncheckedUpdateManyWithoutSpellbooksNestedInputSchema).optional(),
  classes: z.lazy(() => ClassUncheckedUpdateManyWithoutSpellbooksNestedInputSchema).optional(),
  races: z.lazy(() => RaceUncheckedUpdateManyWithoutSpellbooksNestedInputSchema).optional()
}).strict();

export const SpellbookUncheckedUpdateManyWithoutAuth_userInputSchema: z.ZodType<Prisma.SpellbookUncheckedUpdateManyWithoutAuth_userInput> = z.object({
  spellbook_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spellbook_description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spell_ids: z.union([ z.lazy(() => SpellbookUpdatespell_idsInputSchema),z.string().array() ]).optional(),
  class_ids: z.union([ z.lazy(() => SpellbookUpdateclass_idsInputSchema),z.string().array() ]).optional(),
  race_ids: z.union([ z.lazy(() => SpellbookUpdaterace_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const SpellUpdateWithoutSpellbooksInputSchema: z.ZodType<Prisma.SpellUpdateWithoutSpellbooksInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.lazy(() => SpellUpdatedescInputSchema),z.string().array() ]).optional(),
  higher_level: z.union([ z.lazy(() => SpellUpdatehigher_levelInputSchema),z.string().array() ]).optional(),
  range: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  components: z.union([ z.lazy(() => SpellUpdatecomponentsInputSchema),z.lazy(() => ComponentsSchema).array() ]).optional(),
  material: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  area_of_effect: z.union([ z.lazy(() => AreaOfEffectNullableUpdateEnvelopeInputSchema),z.lazy(() => AreaOfEffectCreateInputSchema) ]).optional().nullable(),
  ritual: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  concentration: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  casting_time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  damage: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  dc: z.union([ z.lazy(() => DifficultyClassNullableUpdateEnvelopeInputSchema),z.lazy(() => DifficultyClassCreateInputSchema) ]).optional().nullable(),
  school: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
  classes: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
}).strict();

export const SpellUncheckedUpdateWithoutSpellbooksInputSchema: z.ZodType<Prisma.SpellUncheckedUpdateWithoutSpellbooksInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.lazy(() => SpellUpdatedescInputSchema),z.string().array() ]).optional(),
  higher_level: z.union([ z.lazy(() => SpellUpdatehigher_levelInputSchema),z.string().array() ]).optional(),
  range: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  components: z.union([ z.lazy(() => SpellUpdatecomponentsInputSchema),z.lazy(() => ComponentsSchema).array() ]).optional(),
  material: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  area_of_effect: z.union([ z.lazy(() => AreaOfEffectNullableUpdateEnvelopeInputSchema),z.lazy(() => AreaOfEffectCreateInputSchema) ]).optional().nullable(),
  ritual: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  concentration: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  casting_time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  damage: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  dc: z.union([ z.lazy(() => DifficultyClassNullableUpdateEnvelopeInputSchema),z.lazy(() => DifficultyClassCreateInputSchema) ]).optional().nullable(),
  school: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
  classes: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => SpellUpdatespellbook_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const SpellUncheckedUpdateManyWithoutSpellbooksInputSchema: z.ZodType<Prisma.SpellUncheckedUpdateManyWithoutSpellbooksInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.lazy(() => SpellUpdatedescInputSchema),z.string().array() ]).optional(),
  higher_level: z.union([ z.lazy(() => SpellUpdatehigher_levelInputSchema),z.string().array() ]).optional(),
  range: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  components: z.union([ z.lazy(() => SpellUpdatecomponentsInputSchema),z.lazy(() => ComponentsSchema).array() ]).optional(),
  material: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  area_of_effect: z.union([ z.lazy(() => AreaOfEffectNullableUpdateEnvelopeInputSchema),z.lazy(() => AreaOfEffectCreateInputSchema) ]).optional().nullable(),
  ritual: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  concentration: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  casting_time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  damage: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  dc: z.union([ z.lazy(() => DifficultyClassNullableUpdateEnvelopeInputSchema),z.lazy(() => DifficultyClassCreateInputSchema) ]).optional().nullable(),
  school: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
  classes: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => SpellUpdatespellbook_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const ClassUpdateWithoutSpellbooksInputSchema: z.ZodType<Prisma.ClassUpdateWithoutSpellbooksInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hit_die: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  class_levels: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  multi_classing: z.union([ z.lazy(() => MulticlassingNullableUpdateEnvelopeInputSchema),z.lazy(() => MulticlassingCreateInputSchema) ]).optional().nullable(),
  spells: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  starting_equipment: z.union([ z.lazy(() => StartingEquipmentListUpdateEnvelopeInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema).array() ]).optional(),
  starting_equipment_options: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  saving_throws: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  proficiencies: z.lazy(() => ProficiencyUpdateManyWithoutClassesNestedInputSchema).optional()
}).strict();

export const ClassUncheckedUpdateWithoutSpellbooksInputSchema: z.ZodType<Prisma.ClassUncheckedUpdateWithoutSpellbooksInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hit_die: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  class_levels: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  multi_classing: z.union([ z.lazy(() => MulticlassingNullableUpdateEnvelopeInputSchema),z.lazy(() => MulticlassingCreateInputSchema) ]).optional().nullable(),
  spells: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  starting_equipment: z.union([ z.lazy(() => StartingEquipmentListUpdateEnvelopeInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema).array() ]).optional(),
  starting_equipment_options: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  proficiency_ids: z.union([ z.lazy(() => ClassUpdateproficiency_idsInputSchema),z.string().array() ]).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  saving_throws: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => ClassUpdatespellbook_idsInputSchema),z.string().array() ]).optional(),
  proficiencies: z.lazy(() => ProficiencyUncheckedUpdateManyWithoutClassesNestedInputSchema).optional()
}).strict();

export const ClassUncheckedUpdateManyWithoutSpellbooksInputSchema: z.ZodType<Prisma.ClassUncheckedUpdateManyWithoutSpellbooksInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hit_die: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  class_levels: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  multi_classing: z.union([ z.lazy(() => MulticlassingNullableUpdateEnvelopeInputSchema),z.lazy(() => MulticlassingCreateInputSchema) ]).optional().nullable(),
  spells: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  starting_equipment: z.union([ z.lazy(() => StartingEquipmentListUpdateEnvelopeInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema).array() ]).optional(),
  starting_equipment_options: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  proficiency_ids: z.union([ z.lazy(() => ClassUpdateproficiency_idsInputSchema),z.string().array() ]).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  saving_throws: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => ClassUpdatespellbook_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const RaceUpdateWithoutSpellbooksInputSchema: z.ZodType<Prisma.RaceUpdateWithoutSpellbooksInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ability_bonuses: z.union([ z.lazy(() => AbilityBonusListUpdateEnvelopeInputSchema),z.lazy(() => AbilityBonusCreateInputSchema),z.lazy(() => AbilityBonusCreateInputSchema).array() ]).optional(),
  alignment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size_description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  starting_proficiencies: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  starting_proficiency_options: z.union([ z.lazy(() => ChoiceNullableUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  language_desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  traits: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subraces: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
}).strict();

export const RaceUncheckedUpdateWithoutSpellbooksInputSchema: z.ZodType<Prisma.RaceUncheckedUpdateWithoutSpellbooksInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ability_bonuses: z.union([ z.lazy(() => AbilityBonusListUpdateEnvelopeInputSchema),z.lazy(() => AbilityBonusCreateInputSchema),z.lazy(() => AbilityBonusCreateInputSchema).array() ]).optional(),
  alignment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size_description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  starting_proficiencies: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  starting_proficiency_options: z.union([ z.lazy(() => ChoiceNullableUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  language_desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  traits: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subraces: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => RaceUpdatespellbook_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const RaceUncheckedUpdateManyWithoutSpellbooksInputSchema: z.ZodType<Prisma.RaceUncheckedUpdateManyWithoutSpellbooksInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ability_bonuses: z.union([ z.lazy(() => AbilityBonusListUpdateEnvelopeInputSchema),z.lazy(() => AbilityBonusCreateInputSchema),z.lazy(() => AbilityBonusCreateInputSchema).array() ]).optional(),
  alignment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size_description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  starting_proficiencies: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  starting_proficiency_options: z.union([ z.lazy(() => ChoiceNullableUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  language_desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  traits: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subraces: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => RaceUpdatespellbook_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const AreaOfEffectUpdateInputSchema: z.ZodType<Prisma.AreaOfEffectUpdateInput> = z.object({
  size: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => AOETypeSchema),z.lazy(() => EnumAOETypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DifficultyClassUpdateInputSchema: z.ZodType<Prisma.DifficultyClassUpdateInput> = z.object({
  dc_success: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dc_type: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SpellbookUpdateWithoutSpellsInputSchema: z.ZodType<Prisma.SpellbookUpdateWithoutSpellsInput> = z.object({
  spellbook_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spellbook_description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_user: z.lazy(() => UserUpdateOneRequiredWithoutSpellbooksNestedInputSchema).optional(),
  classes: z.lazy(() => ClassUpdateManyWithoutSpellbooksNestedInputSchema).optional(),
  races: z.lazy(() => RaceUpdateManyWithoutSpellbooksNestedInputSchema).optional()
}).strict();

export const SpellbookUncheckedUpdateWithoutSpellsInputSchema: z.ZodType<Prisma.SpellbookUncheckedUpdateWithoutSpellsInput> = z.object({
  spellbook_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spellbook_description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spell_ids: z.union([ z.lazy(() => SpellbookUpdatespell_idsInputSchema),z.string().array() ]).optional(),
  class_ids: z.union([ z.lazy(() => SpellbookUpdateclass_idsInputSchema),z.string().array() ]).optional(),
  race_ids: z.union([ z.lazy(() => SpellbookUpdaterace_idsInputSchema),z.string().array() ]).optional(),
  classes: z.lazy(() => ClassUncheckedUpdateManyWithoutSpellbooksNestedInputSchema).optional(),
  races: z.lazy(() => RaceUncheckedUpdateManyWithoutSpellbooksNestedInputSchema).optional()
}).strict();

export const SpellbookUncheckedUpdateManyWithoutSpellsInputSchema: z.ZodType<Prisma.SpellbookUncheckedUpdateManyWithoutSpellsInput> = z.object({
  spellbook_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spellbook_description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spell_ids: z.union([ z.lazy(() => SpellbookUpdatespell_idsInputSchema),z.string().array() ]).optional(),
  class_ids: z.union([ z.lazy(() => SpellbookUpdateclass_idsInputSchema),z.string().array() ]).optional(),
  race_ids: z.union([ z.lazy(() => SpellbookUpdaterace_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const MulticlassingUpdateInputSchema: z.ZodType<Prisma.MulticlassingUpdateInput> = z.object({
  prerequisites: z.union([ z.lazy(() => PrerequisiteListUpdateEnvelopeInputSchema),z.lazy(() => PrerequisiteCreateInputSchema),z.lazy(() => PrerequisiteCreateInputSchema).array() ]).optional(),
  prerequisite_options: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  proficiencies: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
}).strict();

export const StartingEquipmentUpdateInputSchema: z.ZodType<Prisma.StartingEquipmentUpdateInput> = z.object({
  quantity: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  equipment: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
}).strict();

export const ChoiceUpdateInputSchema: z.ZodType<Prisma.ChoiceUpdateInput> = z.object({
  desc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  choose: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  from: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
}).strict();

export const ProficiencyUpdateWithoutClassesInputSchema: z.ZodType<Prisma.ProficiencyUpdateWithoutClassesInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  race_ids: z.union([ z.lazy(() => ProficiencyUpdaterace_idsInputSchema),z.string().array() ]).optional(),
  reference: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
}).strict();

export const ProficiencyUncheckedUpdateWithoutClassesInputSchema: z.ZodType<Prisma.ProficiencyUncheckedUpdateWithoutClassesInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  race_ids: z.union([ z.lazy(() => ProficiencyUpdaterace_idsInputSchema),z.string().array() ]).optional(),
  reference: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
  class_ids: z.union([ z.lazy(() => ProficiencyUpdateclass_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const ProficiencyUncheckedUpdateManyWithoutClassesInputSchema: z.ZodType<Prisma.ProficiencyUncheckedUpdateManyWithoutClassesInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  race_ids: z.union([ z.lazy(() => ProficiencyUpdaterace_idsInputSchema),z.string().array() ]).optional(),
  reference: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
  class_ids: z.union([ z.lazy(() => ProficiencyUpdateclass_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const SpellbookUpdateWithoutClassesInputSchema: z.ZodType<Prisma.SpellbookUpdateWithoutClassesInput> = z.object({
  spellbook_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spellbook_description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_user: z.lazy(() => UserUpdateOneRequiredWithoutSpellbooksNestedInputSchema).optional(),
  spells: z.lazy(() => SpellUpdateManyWithoutSpellbooksNestedInputSchema).optional(),
  races: z.lazy(() => RaceUpdateManyWithoutSpellbooksNestedInputSchema).optional()
}).strict();

export const SpellbookUncheckedUpdateWithoutClassesInputSchema: z.ZodType<Prisma.SpellbookUncheckedUpdateWithoutClassesInput> = z.object({
  spellbook_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spellbook_description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spell_ids: z.union([ z.lazy(() => SpellbookUpdatespell_idsInputSchema),z.string().array() ]).optional(),
  class_ids: z.union([ z.lazy(() => SpellbookUpdateclass_idsInputSchema),z.string().array() ]).optional(),
  race_ids: z.union([ z.lazy(() => SpellbookUpdaterace_idsInputSchema),z.string().array() ]).optional(),
  spells: z.lazy(() => SpellUncheckedUpdateManyWithoutSpellbooksNestedInputSchema).optional(),
  races: z.lazy(() => RaceUncheckedUpdateManyWithoutSpellbooksNestedInputSchema).optional()
}).strict();

export const SpellbookUncheckedUpdateManyWithoutClassesInputSchema: z.ZodType<Prisma.SpellbookUncheckedUpdateManyWithoutClassesInput> = z.object({
  spellbook_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spellbook_description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spell_ids: z.union([ z.lazy(() => SpellbookUpdatespell_idsInputSchema),z.string().array() ]).optional(),
  class_ids: z.union([ z.lazy(() => SpellbookUpdateclass_idsInputSchema),z.string().array() ]).optional(),
  race_ids: z.union([ z.lazy(() => SpellbookUpdaterace_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const AbilityBonusUpdateInputSchema: z.ZodType<Prisma.AbilityBonusUpdateInput> = z.object({
  bonus: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ability_score: z.union([ z.lazy(() => APIReferenceUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional(),
}).strict();

export const SpellbookUpdateWithoutRacesInputSchema: z.ZodType<Prisma.SpellbookUpdateWithoutRacesInput> = z.object({
  spellbook_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spellbook_description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_user: z.lazy(() => UserUpdateOneRequiredWithoutSpellbooksNestedInputSchema).optional(),
  spells: z.lazy(() => SpellUpdateManyWithoutSpellbooksNestedInputSchema).optional(),
  classes: z.lazy(() => ClassUpdateManyWithoutSpellbooksNestedInputSchema).optional()
}).strict();

export const SpellbookUncheckedUpdateWithoutRacesInputSchema: z.ZodType<Prisma.SpellbookUncheckedUpdateWithoutRacesInput> = z.object({
  spellbook_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spellbook_description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spell_ids: z.union([ z.lazy(() => SpellbookUpdatespell_idsInputSchema),z.string().array() ]).optional(),
  class_ids: z.union([ z.lazy(() => SpellbookUpdateclass_idsInputSchema),z.string().array() ]).optional(),
  race_ids: z.union([ z.lazy(() => SpellbookUpdaterace_idsInputSchema),z.string().array() ]).optional(),
  spells: z.lazy(() => SpellUncheckedUpdateManyWithoutSpellbooksNestedInputSchema).optional(),
  classes: z.lazy(() => ClassUncheckedUpdateManyWithoutSpellbooksNestedInputSchema).optional()
}).strict();

export const SpellbookUncheckedUpdateManyWithoutRacesInputSchema: z.ZodType<Prisma.SpellbookUncheckedUpdateManyWithoutRacesInput> = z.object({
  spellbook_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spellbook_description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spell_ids: z.union([ z.lazy(() => SpellbookUpdatespell_idsInputSchema),z.string().array() ]).optional(),
  class_ids: z.union([ z.lazy(() => SpellbookUpdateclass_idsInputSchema),z.string().array() ]).optional(),
  race_ids: z.union([ z.lazy(() => SpellbookUpdaterace_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const ClassUpdateWithoutProficienciesInputSchema: z.ZodType<Prisma.ClassUpdateWithoutProficienciesInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hit_die: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  class_levels: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  multi_classing: z.union([ z.lazy(() => MulticlassingNullableUpdateEnvelopeInputSchema),z.lazy(() => MulticlassingCreateInputSchema) ]).optional().nullable(),
  spells: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  starting_equipment: z.union([ z.lazy(() => StartingEquipmentListUpdateEnvelopeInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema).array() ]).optional(),
  starting_equipment_options: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  saving_throws: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbooks: z.lazy(() => SpellbookUpdateManyWithoutClassesNestedInputSchema).optional()
}).strict();

export const ClassUncheckedUpdateWithoutProficienciesInputSchema: z.ZodType<Prisma.ClassUncheckedUpdateWithoutProficienciesInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hit_die: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  class_levels: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  multi_classing: z.union([ z.lazy(() => MulticlassingNullableUpdateEnvelopeInputSchema),z.lazy(() => MulticlassingCreateInputSchema) ]).optional().nullable(),
  spells: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  starting_equipment: z.union([ z.lazy(() => StartingEquipmentListUpdateEnvelopeInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema).array() ]).optional(),
  starting_equipment_options: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  proficiency_ids: z.union([ z.lazy(() => ClassUpdateproficiency_idsInputSchema),z.string().array() ]).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  saving_throws: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => ClassUpdatespellbook_idsInputSchema),z.string().array() ]).optional(),
  spellbooks: z.lazy(() => SpellbookUncheckedUpdateManyWithoutClassesNestedInputSchema).optional()
}).strict();

export const ClassUncheckedUpdateManyWithoutProficienciesInputSchema: z.ZodType<Prisma.ClassUncheckedUpdateManyWithoutProficienciesInput> = z.object({
  index: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hit_die: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  class_levels: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  multi_classing: z.union([ z.lazy(() => MulticlassingNullableUpdateEnvelopeInputSchema),z.lazy(() => MulticlassingCreateInputSchema) ]).optional().nullable(),
  spells: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  starting_equipment: z.union([ z.lazy(() => StartingEquipmentListUpdateEnvelopeInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema),z.lazy(() => StartingEquipmentCreateInputSchema).array() ]).optional(),
  starting_equipment_options: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  proficiency_ids: z.union([ z.lazy(() => ClassUpdateproficiency_idsInputSchema),z.string().array() ]).optional(),
  proficiency_choices: z.union([ z.lazy(() => ChoiceListUpdateEnvelopeInputSchema),z.lazy(() => ChoiceCreateInputSchema),z.lazy(() => ChoiceCreateInputSchema).array() ]).optional(),
  saving_throws: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  subclasses: z.union([ z.lazy(() => APIReferenceListUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema),z.lazy(() => APIReferenceCreateInputSchema).array() ]).optional(),
  spellbook_ids: z.union([ z.lazy(() => ClassUpdatespellbook_idsInputSchema),z.string().array() ]).optional(),
}).strict();

export const NestedEnumAOETypeFilterSchema: z.ZodType<Prisma.NestedEnumAOETypeFilter> = z.object({
  equals: z.lazy(() => AOETypeSchema).optional(),
  in: z.lazy(() => AOETypeSchema).array().optional(),
  notIn: z.lazy(() => AOETypeSchema).array().optional(),
  not: z.union([ z.lazy(() => AOETypeSchema),z.lazy(() => NestedEnumAOETypeFilterSchema) ]).optional(),
}).strict();

export const PrerequisiteWhereInputSchema: z.ZodType<Prisma.PrerequisiteWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PrerequisiteWhereInputSchema),z.lazy(() => PrerequisiteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PrerequisiteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PrerequisiteWhereInputSchema),z.lazy(() => PrerequisiteWhereInputSchema).array() ]).optional(),
  ability_score: z.union([ z.lazy(() => APIReferenceNullableCompositeFilterSchema),z.lazy(() => APIReferenceObjectEqualityInputSchema) ]).optional().nullable(),
  minimum_score: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const EnumAOETypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAOETypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AOETypeSchema).optional()
}).strict();

export const PrerequisiteListUpdateEnvelopeInputSchema: z.ZodType<Prisma.PrerequisiteListUpdateEnvelopeInput> = z.object({
  set: z.union([ z.lazy(() => PrerequisiteCreateInputSchema),z.lazy(() => PrerequisiteCreateInputSchema).array() ]).optional(),
  push: z.union([ z.lazy(() => PrerequisiteCreateInputSchema),z.lazy(() => PrerequisiteCreateInputSchema).array() ]).optional(),
  updateMany: z.lazy(() => PrerequisiteUpdateManyInputSchema).optional(),
  deleteMany: z.lazy(() => PrerequisiteDeleteManyInputSchema).optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
  unset: z.boolean().optional()
}).strict();

export const APIReferenceNullableCompositeFilterSchema: z.ZodType<Prisma.APIReferenceNullableCompositeFilter> = z.object({
  equals: z.lazy(() => APIReferenceObjectEqualityInputSchema).optional().nullable(),
  is: z.lazy(() => APIReferenceWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => APIReferenceWhereInputSchema).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const PrerequisiteUpdateManyInputSchema: z.ZodType<Prisma.PrerequisiteUpdateManyInput> = z.object({
  where: z.lazy(() => PrerequisiteWhereInputSchema),
  data: z.lazy(() => PrerequisiteUpdateInputSchema)
}).strict();

export const PrerequisiteDeleteManyInputSchema: z.ZodType<Prisma.PrerequisiteDeleteManyInput> = z.object({
  where: z.lazy(() => PrerequisiteWhereInputSchema)
}).strict();

export const PrerequisiteUpdateInputSchema: z.ZodType<Prisma.PrerequisiteUpdateInput> = z.object({
  ability_score: z.union([ z.lazy(() => APIReferenceNullableUpdateEnvelopeInputSchema),z.lazy(() => APIReferenceCreateInputSchema) ]).optional().nullable(),
  minimum_score: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const APIReferenceNullableUpdateEnvelopeInputSchema: z.ZodType<Prisma.APIReferenceNullableUpdateEnvelopeInput> = z.object({
  set: z.lazy(() => APIReferenceCreateInputSchema).optional().nullable(),
  upsert: z.lazy(() => APIReferenceUpsertInputSchema).optional(),
  unset: z.boolean().optional()
}).strict();

export const APIReferenceUpsertInputSchema: z.ZodType<Prisma.APIReferenceUpsertInput> = z.object({
  set: z.lazy(() => APIReferenceCreateInputSchema).nullable(),
  update: z.lazy(() => APIReferenceUpdateInputSchema)
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const SpellbookFindFirstArgsSchema: z.ZodType<Prisma.SpellbookFindFirstArgs> = z.object({
  select: SpellbookSelectSchema.optional(),
  include: SpellbookIncludeSchema.optional(),
  where: SpellbookWhereInputSchema.optional(),
  orderBy: z.union([ SpellbookOrderByWithRelationInputSchema.array(),SpellbookOrderByWithRelationInputSchema ]).optional(),
  cursor: SpellbookWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpellbookScalarFieldEnumSchema,SpellbookScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpellbookFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SpellbookFindFirstOrThrowArgs> = z.object({
  select: SpellbookSelectSchema.optional(),
  include: SpellbookIncludeSchema.optional(),
  where: SpellbookWhereInputSchema.optional(),
  orderBy: z.union([ SpellbookOrderByWithRelationInputSchema.array(),SpellbookOrderByWithRelationInputSchema ]).optional(),
  cursor: SpellbookWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpellbookScalarFieldEnumSchema,SpellbookScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpellbookFindManyArgsSchema: z.ZodType<Prisma.SpellbookFindManyArgs> = z.object({
  select: SpellbookSelectSchema.optional(),
  include: SpellbookIncludeSchema.optional(),
  where: SpellbookWhereInputSchema.optional(),
  orderBy: z.union([ SpellbookOrderByWithRelationInputSchema.array(),SpellbookOrderByWithRelationInputSchema ]).optional(),
  cursor: SpellbookWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpellbookScalarFieldEnumSchema,SpellbookScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpellbookAggregateArgsSchema: z.ZodType<Prisma.SpellbookAggregateArgs> = z.object({
  where: SpellbookWhereInputSchema.optional(),
  orderBy: z.union([ SpellbookOrderByWithRelationInputSchema.array(),SpellbookOrderByWithRelationInputSchema ]).optional(),
  cursor: SpellbookWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SpellbookGroupByArgsSchema: z.ZodType<Prisma.SpellbookGroupByArgs> = z.object({
  where: SpellbookWhereInputSchema.optional(),
  orderBy: z.union([ SpellbookOrderByWithAggregationInputSchema.array(),SpellbookOrderByWithAggregationInputSchema ]).optional(),
  by: SpellbookScalarFieldEnumSchema.array(),
  having: SpellbookScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SpellbookFindUniqueArgsSchema: z.ZodType<Prisma.SpellbookFindUniqueArgs> = z.object({
  select: SpellbookSelectSchema.optional(),
  include: SpellbookIncludeSchema.optional(),
  where: SpellbookWhereUniqueInputSchema,
}).strict() ;

export const SpellbookFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SpellbookFindUniqueOrThrowArgs> = z.object({
  select: SpellbookSelectSchema.optional(),
  include: SpellbookIncludeSchema.optional(),
  where: SpellbookWhereUniqueInputSchema,
}).strict() ;

export const SpellFindFirstArgsSchema: z.ZodType<Prisma.SpellFindFirstArgs> = z.object({
  select: SpellSelectSchema.optional(),
  include: SpellIncludeSchema.optional(),
  where: SpellWhereInputSchema.optional(),
  orderBy: z.union([ SpellOrderByWithRelationInputSchema.array(),SpellOrderByWithRelationInputSchema ]).optional(),
  cursor: SpellWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpellScalarFieldEnumSchema,SpellScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpellFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SpellFindFirstOrThrowArgs> = z.object({
  select: SpellSelectSchema.optional(),
  include: SpellIncludeSchema.optional(),
  where: SpellWhereInputSchema.optional(),
  orderBy: z.union([ SpellOrderByWithRelationInputSchema.array(),SpellOrderByWithRelationInputSchema ]).optional(),
  cursor: SpellWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpellScalarFieldEnumSchema,SpellScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpellFindManyArgsSchema: z.ZodType<Prisma.SpellFindManyArgs> = z.object({
  select: SpellSelectSchema.optional(),
  include: SpellIncludeSchema.optional(),
  where: SpellWhereInputSchema.optional(),
  orderBy: z.union([ SpellOrderByWithRelationInputSchema.array(),SpellOrderByWithRelationInputSchema ]).optional(),
  cursor: SpellWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpellScalarFieldEnumSchema,SpellScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpellAggregateArgsSchema: z.ZodType<Prisma.SpellAggregateArgs> = z.object({
  where: SpellWhereInputSchema.optional(),
  orderBy: z.union([ SpellOrderByWithRelationInputSchema.array(),SpellOrderByWithRelationInputSchema ]).optional(),
  cursor: SpellWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SpellGroupByArgsSchema: z.ZodType<Prisma.SpellGroupByArgs> = z.object({
  where: SpellWhereInputSchema.optional(),
  orderBy: z.union([ SpellOrderByWithAggregationInputSchema.array(),SpellOrderByWithAggregationInputSchema ]).optional(),
  by: SpellScalarFieldEnumSchema.array(),
  having: SpellScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SpellFindUniqueArgsSchema: z.ZodType<Prisma.SpellFindUniqueArgs> = z.object({
  select: SpellSelectSchema.optional(),
  include: SpellIncludeSchema.optional(),
  where: SpellWhereUniqueInputSchema,
}).strict() ;

export const SpellFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SpellFindUniqueOrThrowArgs> = z.object({
  select: SpellSelectSchema.optional(),
  include: SpellIncludeSchema.optional(),
  where: SpellWhereUniqueInputSchema,
}).strict() ;

export const ClassFindFirstArgsSchema: z.ZodType<Prisma.ClassFindFirstArgs> = z.object({
  select: ClassSelectSchema.optional(),
  include: ClassIncludeSchema.optional(),
  where: ClassWhereInputSchema.optional(),
  orderBy: z.union([ ClassOrderByWithRelationInputSchema.array(),ClassOrderByWithRelationInputSchema ]).optional(),
  cursor: ClassWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClassScalarFieldEnumSchema,ClassScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ClassFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ClassFindFirstOrThrowArgs> = z.object({
  select: ClassSelectSchema.optional(),
  include: ClassIncludeSchema.optional(),
  where: ClassWhereInputSchema.optional(),
  orderBy: z.union([ ClassOrderByWithRelationInputSchema.array(),ClassOrderByWithRelationInputSchema ]).optional(),
  cursor: ClassWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClassScalarFieldEnumSchema,ClassScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ClassFindManyArgsSchema: z.ZodType<Prisma.ClassFindManyArgs> = z.object({
  select: ClassSelectSchema.optional(),
  include: ClassIncludeSchema.optional(),
  where: ClassWhereInputSchema.optional(),
  orderBy: z.union([ ClassOrderByWithRelationInputSchema.array(),ClassOrderByWithRelationInputSchema ]).optional(),
  cursor: ClassWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClassScalarFieldEnumSchema,ClassScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ClassAggregateArgsSchema: z.ZodType<Prisma.ClassAggregateArgs> = z.object({
  where: ClassWhereInputSchema.optional(),
  orderBy: z.union([ ClassOrderByWithRelationInputSchema.array(),ClassOrderByWithRelationInputSchema ]).optional(),
  cursor: ClassWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ClassGroupByArgsSchema: z.ZodType<Prisma.ClassGroupByArgs> = z.object({
  where: ClassWhereInputSchema.optional(),
  orderBy: z.union([ ClassOrderByWithAggregationInputSchema.array(),ClassOrderByWithAggregationInputSchema ]).optional(),
  by: ClassScalarFieldEnumSchema.array(),
  having: ClassScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ClassFindUniqueArgsSchema: z.ZodType<Prisma.ClassFindUniqueArgs> = z.object({
  select: ClassSelectSchema.optional(),
  include: ClassIncludeSchema.optional(),
  where: ClassWhereUniqueInputSchema,
}).strict() ;

export const ClassFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ClassFindUniqueOrThrowArgs> = z.object({
  select: ClassSelectSchema.optional(),
  include: ClassIncludeSchema.optional(),
  where: ClassWhereUniqueInputSchema,
}).strict() ;

export const RaceFindFirstArgsSchema: z.ZodType<Prisma.RaceFindFirstArgs> = z.object({
  select: RaceSelectSchema.optional(),
  include: RaceIncludeSchema.optional(),
  where: RaceWhereInputSchema.optional(),
  orderBy: z.union([ RaceOrderByWithRelationInputSchema.array(),RaceOrderByWithRelationInputSchema ]).optional(),
  cursor: RaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RaceScalarFieldEnumSchema,RaceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RaceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RaceFindFirstOrThrowArgs> = z.object({
  select: RaceSelectSchema.optional(),
  include: RaceIncludeSchema.optional(),
  where: RaceWhereInputSchema.optional(),
  orderBy: z.union([ RaceOrderByWithRelationInputSchema.array(),RaceOrderByWithRelationInputSchema ]).optional(),
  cursor: RaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RaceScalarFieldEnumSchema,RaceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RaceFindManyArgsSchema: z.ZodType<Prisma.RaceFindManyArgs> = z.object({
  select: RaceSelectSchema.optional(),
  include: RaceIncludeSchema.optional(),
  where: RaceWhereInputSchema.optional(),
  orderBy: z.union([ RaceOrderByWithRelationInputSchema.array(),RaceOrderByWithRelationInputSchema ]).optional(),
  cursor: RaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RaceScalarFieldEnumSchema,RaceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RaceAggregateArgsSchema: z.ZodType<Prisma.RaceAggregateArgs> = z.object({
  where: RaceWhereInputSchema.optional(),
  orderBy: z.union([ RaceOrderByWithRelationInputSchema.array(),RaceOrderByWithRelationInputSchema ]).optional(),
  cursor: RaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RaceGroupByArgsSchema: z.ZodType<Prisma.RaceGroupByArgs> = z.object({
  where: RaceWhereInputSchema.optional(),
  orderBy: z.union([ RaceOrderByWithAggregationInputSchema.array(),RaceOrderByWithAggregationInputSchema ]).optional(),
  by: RaceScalarFieldEnumSchema.array(),
  having: RaceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RaceFindUniqueArgsSchema: z.ZodType<Prisma.RaceFindUniqueArgs> = z.object({
  select: RaceSelectSchema.optional(),
  include: RaceIncludeSchema.optional(),
  where: RaceWhereUniqueInputSchema,
}).strict() ;

export const RaceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RaceFindUniqueOrThrowArgs> = z.object({
  select: RaceSelectSchema.optional(),
  include: RaceIncludeSchema.optional(),
  where: RaceWhereUniqueInputSchema,
}).strict() ;

export const AbilityScoreFindFirstArgsSchema: z.ZodType<Prisma.AbilityScoreFindFirstArgs> = z.object({
  select: AbilityScoreSelectSchema.optional(),
  include: AbilityScoreIncludeSchema.optional(),
  where: AbilityScoreWhereInputSchema.optional(),
  orderBy: z.union([ AbilityScoreOrderByWithRelationInputSchema.array(),AbilityScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: AbilityScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AbilityScoreScalarFieldEnumSchema,AbilityScoreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AbilityScoreFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AbilityScoreFindFirstOrThrowArgs> = z.object({
  select: AbilityScoreSelectSchema.optional(),
  include: AbilityScoreIncludeSchema.optional(),
  where: AbilityScoreWhereInputSchema.optional(),
  orderBy: z.union([ AbilityScoreOrderByWithRelationInputSchema.array(),AbilityScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: AbilityScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AbilityScoreScalarFieldEnumSchema,AbilityScoreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AbilityScoreFindManyArgsSchema: z.ZodType<Prisma.AbilityScoreFindManyArgs> = z.object({
  select: AbilityScoreSelectSchema.optional(),
  include: AbilityScoreIncludeSchema.optional(),
  where: AbilityScoreWhereInputSchema.optional(),
  orderBy: z.union([ AbilityScoreOrderByWithRelationInputSchema.array(),AbilityScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: AbilityScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AbilityScoreScalarFieldEnumSchema,AbilityScoreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AbilityScoreAggregateArgsSchema: z.ZodType<Prisma.AbilityScoreAggregateArgs> = z.object({
  where: AbilityScoreWhereInputSchema.optional(),
  orderBy: z.union([ AbilityScoreOrderByWithRelationInputSchema.array(),AbilityScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: AbilityScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AbilityScoreGroupByArgsSchema: z.ZodType<Prisma.AbilityScoreGroupByArgs> = z.object({
  where: AbilityScoreWhereInputSchema.optional(),
  orderBy: z.union([ AbilityScoreOrderByWithAggregationInputSchema.array(),AbilityScoreOrderByWithAggregationInputSchema ]).optional(),
  by: AbilityScoreScalarFieldEnumSchema.array(),
  having: AbilityScoreScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AbilityScoreFindUniqueArgsSchema: z.ZodType<Prisma.AbilityScoreFindUniqueArgs> = z.object({
  select: AbilityScoreSelectSchema.optional(),
  include: AbilityScoreIncludeSchema.optional(),
  where: AbilityScoreWhereUniqueInputSchema,
}).strict() ;

export const AbilityScoreFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AbilityScoreFindUniqueOrThrowArgs> = z.object({
  select: AbilityScoreSelectSchema.optional(),
  include: AbilityScoreIncludeSchema.optional(),
  where: AbilityScoreWhereUniqueInputSchema,
}).strict() ;

export const SkillFindFirstArgsSchema: z.ZodType<Prisma.SkillFindFirstArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereInputSchema.optional(),
  orderBy: z.union([ SkillOrderByWithRelationInputSchema.array(),SkillOrderByWithRelationInputSchema ]).optional(),
  cursor: SkillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SkillScalarFieldEnumSchema,SkillScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SkillFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SkillFindFirstOrThrowArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereInputSchema.optional(),
  orderBy: z.union([ SkillOrderByWithRelationInputSchema.array(),SkillOrderByWithRelationInputSchema ]).optional(),
  cursor: SkillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SkillScalarFieldEnumSchema,SkillScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SkillFindManyArgsSchema: z.ZodType<Prisma.SkillFindManyArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereInputSchema.optional(),
  orderBy: z.union([ SkillOrderByWithRelationInputSchema.array(),SkillOrderByWithRelationInputSchema ]).optional(),
  cursor: SkillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SkillScalarFieldEnumSchema,SkillScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SkillAggregateArgsSchema: z.ZodType<Prisma.SkillAggregateArgs> = z.object({
  where: SkillWhereInputSchema.optional(),
  orderBy: z.union([ SkillOrderByWithRelationInputSchema.array(),SkillOrderByWithRelationInputSchema ]).optional(),
  cursor: SkillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SkillGroupByArgsSchema: z.ZodType<Prisma.SkillGroupByArgs> = z.object({
  where: SkillWhereInputSchema.optional(),
  orderBy: z.union([ SkillOrderByWithAggregationInputSchema.array(),SkillOrderByWithAggregationInputSchema ]).optional(),
  by: SkillScalarFieldEnumSchema.array(),
  having: SkillScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SkillFindUniqueArgsSchema: z.ZodType<Prisma.SkillFindUniqueArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereUniqueInputSchema,
}).strict() ;

export const SkillFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SkillFindUniqueOrThrowArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereUniqueInputSchema,
}).strict() ;

export const LanguageFindFirstArgsSchema: z.ZodType<Prisma.LanguageFindFirstArgs> = z.object({
  select: LanguageSelectSchema.optional(),
  where: LanguageWhereInputSchema.optional(),
  orderBy: z.union([ LanguageOrderByWithRelationInputSchema.array(),LanguageOrderByWithRelationInputSchema ]).optional(),
  cursor: LanguageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LanguageScalarFieldEnumSchema,LanguageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LanguageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LanguageFindFirstOrThrowArgs> = z.object({
  select: LanguageSelectSchema.optional(),
  where: LanguageWhereInputSchema.optional(),
  orderBy: z.union([ LanguageOrderByWithRelationInputSchema.array(),LanguageOrderByWithRelationInputSchema ]).optional(),
  cursor: LanguageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LanguageScalarFieldEnumSchema,LanguageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LanguageFindManyArgsSchema: z.ZodType<Prisma.LanguageFindManyArgs> = z.object({
  select: LanguageSelectSchema.optional(),
  where: LanguageWhereInputSchema.optional(),
  orderBy: z.union([ LanguageOrderByWithRelationInputSchema.array(),LanguageOrderByWithRelationInputSchema ]).optional(),
  cursor: LanguageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LanguageScalarFieldEnumSchema,LanguageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LanguageAggregateArgsSchema: z.ZodType<Prisma.LanguageAggregateArgs> = z.object({
  where: LanguageWhereInputSchema.optional(),
  orderBy: z.union([ LanguageOrderByWithRelationInputSchema.array(),LanguageOrderByWithRelationInputSchema ]).optional(),
  cursor: LanguageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LanguageGroupByArgsSchema: z.ZodType<Prisma.LanguageGroupByArgs> = z.object({
  where: LanguageWhereInputSchema.optional(),
  orderBy: z.union([ LanguageOrderByWithAggregationInputSchema.array(),LanguageOrderByWithAggregationInputSchema ]).optional(),
  by: LanguageScalarFieldEnumSchema.array(),
  having: LanguageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LanguageFindUniqueArgsSchema: z.ZodType<Prisma.LanguageFindUniqueArgs> = z.object({
  select: LanguageSelectSchema.optional(),
  where: LanguageWhereUniqueInputSchema,
}).strict() ;

export const LanguageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LanguageFindUniqueOrThrowArgs> = z.object({
  select: LanguageSelectSchema.optional(),
  where: LanguageWhereUniqueInputSchema,
}).strict() ;

export const ProficiencyFindFirstArgsSchema: z.ZodType<Prisma.ProficiencyFindFirstArgs> = z.object({
  select: ProficiencySelectSchema.optional(),
  include: ProficiencyIncludeSchema.optional(),
  where: ProficiencyWhereInputSchema.optional(),
  orderBy: z.union([ ProficiencyOrderByWithRelationInputSchema.array(),ProficiencyOrderByWithRelationInputSchema ]).optional(),
  cursor: ProficiencyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProficiencyScalarFieldEnumSchema,ProficiencyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProficiencyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProficiencyFindFirstOrThrowArgs> = z.object({
  select: ProficiencySelectSchema.optional(),
  include: ProficiencyIncludeSchema.optional(),
  where: ProficiencyWhereInputSchema.optional(),
  orderBy: z.union([ ProficiencyOrderByWithRelationInputSchema.array(),ProficiencyOrderByWithRelationInputSchema ]).optional(),
  cursor: ProficiencyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProficiencyScalarFieldEnumSchema,ProficiencyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProficiencyFindManyArgsSchema: z.ZodType<Prisma.ProficiencyFindManyArgs> = z.object({
  select: ProficiencySelectSchema.optional(),
  include: ProficiencyIncludeSchema.optional(),
  where: ProficiencyWhereInputSchema.optional(),
  orderBy: z.union([ ProficiencyOrderByWithRelationInputSchema.array(),ProficiencyOrderByWithRelationInputSchema ]).optional(),
  cursor: ProficiencyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProficiencyScalarFieldEnumSchema,ProficiencyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProficiencyAggregateArgsSchema: z.ZodType<Prisma.ProficiencyAggregateArgs> = z.object({
  where: ProficiencyWhereInputSchema.optional(),
  orderBy: z.union([ ProficiencyOrderByWithRelationInputSchema.array(),ProficiencyOrderByWithRelationInputSchema ]).optional(),
  cursor: ProficiencyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProficiencyGroupByArgsSchema: z.ZodType<Prisma.ProficiencyGroupByArgs> = z.object({
  where: ProficiencyWhereInputSchema.optional(),
  orderBy: z.union([ ProficiencyOrderByWithAggregationInputSchema.array(),ProficiencyOrderByWithAggregationInputSchema ]).optional(),
  by: ProficiencyScalarFieldEnumSchema.array(),
  having: ProficiencyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProficiencyFindUniqueArgsSchema: z.ZodType<Prisma.ProficiencyFindUniqueArgs> = z.object({
  select: ProficiencySelectSchema.optional(),
  include: ProficiencyIncludeSchema.optional(),
  where: ProficiencyWhereUniqueInputSchema,
}).strict() ;

export const ProficiencyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProficiencyFindUniqueOrThrowArgs> = z.object({
  select: ProficiencySelectSchema.optional(),
  include: ProficiencyIncludeSchema.optional(),
  where: ProficiencyWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SpellbookCreateArgsSchema: z.ZodType<Prisma.SpellbookCreateArgs> = z.object({
  select: SpellbookSelectSchema.optional(),
  include: SpellbookIncludeSchema.optional(),
  data: z.union([ SpellbookCreateInputSchema,SpellbookUncheckedCreateInputSchema ]),
}).strict() ;

export const SpellbookUpsertArgsSchema: z.ZodType<Prisma.SpellbookUpsertArgs> = z.object({
  select: SpellbookSelectSchema.optional(),
  include: SpellbookIncludeSchema.optional(),
  where: SpellbookWhereUniqueInputSchema,
  create: z.union([ SpellbookCreateInputSchema,SpellbookUncheckedCreateInputSchema ]),
  update: z.union([ SpellbookUpdateInputSchema,SpellbookUncheckedUpdateInputSchema ]),
}).strict() ;

export const SpellbookCreateManyArgsSchema: z.ZodType<Prisma.SpellbookCreateManyArgs> = z.object({
  data: z.union([ SpellbookCreateManyInputSchema,SpellbookCreateManyInputSchema.array() ]),
}).strict() ;

export const SpellbookDeleteArgsSchema: z.ZodType<Prisma.SpellbookDeleteArgs> = z.object({
  select: SpellbookSelectSchema.optional(),
  include: SpellbookIncludeSchema.optional(),
  where: SpellbookWhereUniqueInputSchema,
}).strict() ;

export const SpellbookUpdateArgsSchema: z.ZodType<Prisma.SpellbookUpdateArgs> = z.object({
  select: SpellbookSelectSchema.optional(),
  include: SpellbookIncludeSchema.optional(),
  data: z.union([ SpellbookUpdateInputSchema,SpellbookUncheckedUpdateInputSchema ]),
  where: SpellbookWhereUniqueInputSchema,
}).strict() ;

export const SpellbookUpdateManyArgsSchema: z.ZodType<Prisma.SpellbookUpdateManyArgs> = z.object({
  data: z.union([ SpellbookUpdateManyMutationInputSchema,SpellbookUncheckedUpdateManyInputSchema ]),
  where: SpellbookWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SpellbookDeleteManyArgsSchema: z.ZodType<Prisma.SpellbookDeleteManyArgs> = z.object({
  where: SpellbookWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SpellCreateArgsSchema: z.ZodType<Prisma.SpellCreateArgs> = z.object({
  select: SpellSelectSchema.optional(),
  include: SpellIncludeSchema.optional(),
  data: z.union([ SpellCreateInputSchema,SpellUncheckedCreateInputSchema ]),
}).strict() ;

export const SpellUpsertArgsSchema: z.ZodType<Prisma.SpellUpsertArgs> = z.object({
  select: SpellSelectSchema.optional(),
  include: SpellIncludeSchema.optional(),
  where: SpellWhereUniqueInputSchema,
  create: z.union([ SpellCreateInputSchema,SpellUncheckedCreateInputSchema ]),
  update: z.union([ SpellUpdateInputSchema,SpellUncheckedUpdateInputSchema ]),
}).strict() ;

export const SpellCreateManyArgsSchema: z.ZodType<Prisma.SpellCreateManyArgs> = z.object({
  data: z.union([ SpellCreateManyInputSchema,SpellCreateManyInputSchema.array() ]),
}).strict() ;

export const SpellDeleteArgsSchema: z.ZodType<Prisma.SpellDeleteArgs> = z.object({
  select: SpellSelectSchema.optional(),
  include: SpellIncludeSchema.optional(),
  where: SpellWhereUniqueInputSchema,
}).strict() ;

export const SpellUpdateArgsSchema: z.ZodType<Prisma.SpellUpdateArgs> = z.object({
  select: SpellSelectSchema.optional(),
  include: SpellIncludeSchema.optional(),
  data: z.union([ SpellUpdateInputSchema,SpellUncheckedUpdateInputSchema ]),
  where: SpellWhereUniqueInputSchema,
}).strict() ;

export const SpellUpdateManyArgsSchema: z.ZodType<Prisma.SpellUpdateManyArgs> = z.object({
  data: z.union([ SpellUpdateManyMutationInputSchema,SpellUncheckedUpdateManyInputSchema ]),
  where: SpellWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SpellDeleteManyArgsSchema: z.ZodType<Prisma.SpellDeleteManyArgs> = z.object({
  where: SpellWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ClassCreateArgsSchema: z.ZodType<Prisma.ClassCreateArgs> = z.object({
  select: ClassSelectSchema.optional(),
  include: ClassIncludeSchema.optional(),
  data: z.union([ ClassCreateInputSchema,ClassUncheckedCreateInputSchema ]),
}).strict() ;

export const ClassUpsertArgsSchema: z.ZodType<Prisma.ClassUpsertArgs> = z.object({
  select: ClassSelectSchema.optional(),
  include: ClassIncludeSchema.optional(),
  where: ClassWhereUniqueInputSchema,
  create: z.union([ ClassCreateInputSchema,ClassUncheckedCreateInputSchema ]),
  update: z.union([ ClassUpdateInputSchema,ClassUncheckedUpdateInputSchema ]),
}).strict() ;

export const ClassCreateManyArgsSchema: z.ZodType<Prisma.ClassCreateManyArgs> = z.object({
  data: z.union([ ClassCreateManyInputSchema,ClassCreateManyInputSchema.array() ]),
}).strict() ;

export const ClassDeleteArgsSchema: z.ZodType<Prisma.ClassDeleteArgs> = z.object({
  select: ClassSelectSchema.optional(),
  include: ClassIncludeSchema.optional(),
  where: ClassWhereUniqueInputSchema,
}).strict() ;

export const ClassUpdateArgsSchema: z.ZodType<Prisma.ClassUpdateArgs> = z.object({
  select: ClassSelectSchema.optional(),
  include: ClassIncludeSchema.optional(),
  data: z.union([ ClassUpdateInputSchema,ClassUncheckedUpdateInputSchema ]),
  where: ClassWhereUniqueInputSchema,
}).strict() ;

export const ClassUpdateManyArgsSchema: z.ZodType<Prisma.ClassUpdateManyArgs> = z.object({
  data: z.union([ ClassUpdateManyMutationInputSchema,ClassUncheckedUpdateManyInputSchema ]),
  where: ClassWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ClassDeleteManyArgsSchema: z.ZodType<Prisma.ClassDeleteManyArgs> = z.object({
  where: ClassWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RaceCreateArgsSchema: z.ZodType<Prisma.RaceCreateArgs> = z.object({
  select: RaceSelectSchema.optional(),
  include: RaceIncludeSchema.optional(),
  data: z.union([ RaceCreateInputSchema,RaceUncheckedCreateInputSchema ]),
}).strict() ;

export const RaceUpsertArgsSchema: z.ZodType<Prisma.RaceUpsertArgs> = z.object({
  select: RaceSelectSchema.optional(),
  include: RaceIncludeSchema.optional(),
  where: RaceWhereUniqueInputSchema,
  create: z.union([ RaceCreateInputSchema,RaceUncheckedCreateInputSchema ]),
  update: z.union([ RaceUpdateInputSchema,RaceUncheckedUpdateInputSchema ]),
}).strict() ;

export const RaceCreateManyArgsSchema: z.ZodType<Prisma.RaceCreateManyArgs> = z.object({
  data: z.union([ RaceCreateManyInputSchema,RaceCreateManyInputSchema.array() ]),
}).strict() ;

export const RaceDeleteArgsSchema: z.ZodType<Prisma.RaceDeleteArgs> = z.object({
  select: RaceSelectSchema.optional(),
  include: RaceIncludeSchema.optional(),
  where: RaceWhereUniqueInputSchema,
}).strict() ;

export const RaceUpdateArgsSchema: z.ZodType<Prisma.RaceUpdateArgs> = z.object({
  select: RaceSelectSchema.optional(),
  include: RaceIncludeSchema.optional(),
  data: z.union([ RaceUpdateInputSchema,RaceUncheckedUpdateInputSchema ]),
  where: RaceWhereUniqueInputSchema,
}).strict() ;

export const RaceUpdateManyArgsSchema: z.ZodType<Prisma.RaceUpdateManyArgs> = z.object({
  data: z.union([ RaceUpdateManyMutationInputSchema,RaceUncheckedUpdateManyInputSchema ]),
  where: RaceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RaceDeleteManyArgsSchema: z.ZodType<Prisma.RaceDeleteManyArgs> = z.object({
  where: RaceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AbilityScoreCreateArgsSchema: z.ZodType<Prisma.AbilityScoreCreateArgs> = z.object({
  select: AbilityScoreSelectSchema.optional(),
  include: AbilityScoreIncludeSchema.optional(),
  data: z.union([ AbilityScoreCreateInputSchema,AbilityScoreUncheckedCreateInputSchema ]),
}).strict() ;

export const AbilityScoreUpsertArgsSchema: z.ZodType<Prisma.AbilityScoreUpsertArgs> = z.object({
  select: AbilityScoreSelectSchema.optional(),
  include: AbilityScoreIncludeSchema.optional(),
  where: AbilityScoreWhereUniqueInputSchema,
  create: z.union([ AbilityScoreCreateInputSchema,AbilityScoreUncheckedCreateInputSchema ]),
  update: z.union([ AbilityScoreUpdateInputSchema,AbilityScoreUncheckedUpdateInputSchema ]),
}).strict() ;

export const AbilityScoreCreateManyArgsSchema: z.ZodType<Prisma.AbilityScoreCreateManyArgs> = z.object({
  data: z.union([ AbilityScoreCreateManyInputSchema,AbilityScoreCreateManyInputSchema.array() ]),
}).strict() ;

export const AbilityScoreDeleteArgsSchema: z.ZodType<Prisma.AbilityScoreDeleteArgs> = z.object({
  select: AbilityScoreSelectSchema.optional(),
  include: AbilityScoreIncludeSchema.optional(),
  where: AbilityScoreWhereUniqueInputSchema,
}).strict() ;

export const AbilityScoreUpdateArgsSchema: z.ZodType<Prisma.AbilityScoreUpdateArgs> = z.object({
  select: AbilityScoreSelectSchema.optional(),
  include: AbilityScoreIncludeSchema.optional(),
  data: z.union([ AbilityScoreUpdateInputSchema,AbilityScoreUncheckedUpdateInputSchema ]),
  where: AbilityScoreWhereUniqueInputSchema,
}).strict() ;

export const AbilityScoreUpdateManyArgsSchema: z.ZodType<Prisma.AbilityScoreUpdateManyArgs> = z.object({
  data: z.union([ AbilityScoreUpdateManyMutationInputSchema,AbilityScoreUncheckedUpdateManyInputSchema ]),
  where: AbilityScoreWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AbilityScoreDeleteManyArgsSchema: z.ZodType<Prisma.AbilityScoreDeleteManyArgs> = z.object({
  where: AbilityScoreWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SkillCreateArgsSchema: z.ZodType<Prisma.SkillCreateArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  data: z.union([ SkillCreateInputSchema,SkillUncheckedCreateInputSchema ]),
}).strict() ;

export const SkillUpsertArgsSchema: z.ZodType<Prisma.SkillUpsertArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereUniqueInputSchema,
  create: z.union([ SkillCreateInputSchema,SkillUncheckedCreateInputSchema ]),
  update: z.union([ SkillUpdateInputSchema,SkillUncheckedUpdateInputSchema ]),
}).strict() ;

export const SkillCreateManyArgsSchema: z.ZodType<Prisma.SkillCreateManyArgs> = z.object({
  data: z.union([ SkillCreateManyInputSchema,SkillCreateManyInputSchema.array() ]),
}).strict() ;

export const SkillDeleteArgsSchema: z.ZodType<Prisma.SkillDeleteArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereUniqueInputSchema,
}).strict() ;

export const SkillUpdateArgsSchema: z.ZodType<Prisma.SkillUpdateArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  data: z.union([ SkillUpdateInputSchema,SkillUncheckedUpdateInputSchema ]),
  where: SkillWhereUniqueInputSchema,
}).strict() ;

export const SkillUpdateManyArgsSchema: z.ZodType<Prisma.SkillUpdateManyArgs> = z.object({
  data: z.union([ SkillUpdateManyMutationInputSchema,SkillUncheckedUpdateManyInputSchema ]),
  where: SkillWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SkillDeleteManyArgsSchema: z.ZodType<Prisma.SkillDeleteManyArgs> = z.object({
  where: SkillWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LanguageCreateArgsSchema: z.ZodType<Prisma.LanguageCreateArgs> = z.object({
  select: LanguageSelectSchema.optional(),
  data: z.union([ LanguageCreateInputSchema,LanguageUncheckedCreateInputSchema ]),
}).strict() ;

export const LanguageUpsertArgsSchema: z.ZodType<Prisma.LanguageUpsertArgs> = z.object({
  select: LanguageSelectSchema.optional(),
  where: LanguageWhereUniqueInputSchema,
  create: z.union([ LanguageCreateInputSchema,LanguageUncheckedCreateInputSchema ]),
  update: z.union([ LanguageUpdateInputSchema,LanguageUncheckedUpdateInputSchema ]),
}).strict() ;

export const LanguageCreateManyArgsSchema: z.ZodType<Prisma.LanguageCreateManyArgs> = z.object({
  data: z.union([ LanguageCreateManyInputSchema,LanguageCreateManyInputSchema.array() ]),
}).strict() ;

export const LanguageDeleteArgsSchema: z.ZodType<Prisma.LanguageDeleteArgs> = z.object({
  select: LanguageSelectSchema.optional(),
  where: LanguageWhereUniqueInputSchema,
}).strict() ;

export const LanguageUpdateArgsSchema: z.ZodType<Prisma.LanguageUpdateArgs> = z.object({
  select: LanguageSelectSchema.optional(),
  data: z.union([ LanguageUpdateInputSchema,LanguageUncheckedUpdateInputSchema ]),
  where: LanguageWhereUniqueInputSchema,
}).strict() ;

export const LanguageUpdateManyArgsSchema: z.ZodType<Prisma.LanguageUpdateManyArgs> = z.object({
  data: z.union([ LanguageUpdateManyMutationInputSchema,LanguageUncheckedUpdateManyInputSchema ]),
  where: LanguageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LanguageDeleteManyArgsSchema: z.ZodType<Prisma.LanguageDeleteManyArgs> = z.object({
  where: LanguageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProficiencyCreateArgsSchema: z.ZodType<Prisma.ProficiencyCreateArgs> = z.object({
  select: ProficiencySelectSchema.optional(),
  include: ProficiencyIncludeSchema.optional(),
  data: z.union([ ProficiencyCreateInputSchema,ProficiencyUncheckedCreateInputSchema ]),
}).strict() ;

export const ProficiencyUpsertArgsSchema: z.ZodType<Prisma.ProficiencyUpsertArgs> = z.object({
  select: ProficiencySelectSchema.optional(),
  include: ProficiencyIncludeSchema.optional(),
  where: ProficiencyWhereUniqueInputSchema,
  create: z.union([ ProficiencyCreateInputSchema,ProficiencyUncheckedCreateInputSchema ]),
  update: z.union([ ProficiencyUpdateInputSchema,ProficiencyUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProficiencyCreateManyArgsSchema: z.ZodType<Prisma.ProficiencyCreateManyArgs> = z.object({
  data: z.union([ ProficiencyCreateManyInputSchema,ProficiencyCreateManyInputSchema.array() ]),
}).strict() ;

export const ProficiencyDeleteArgsSchema: z.ZodType<Prisma.ProficiencyDeleteArgs> = z.object({
  select: ProficiencySelectSchema.optional(),
  include: ProficiencyIncludeSchema.optional(),
  where: ProficiencyWhereUniqueInputSchema,
}).strict() ;

export const ProficiencyUpdateArgsSchema: z.ZodType<Prisma.ProficiencyUpdateArgs> = z.object({
  select: ProficiencySelectSchema.optional(),
  include: ProficiencyIncludeSchema.optional(),
  data: z.union([ ProficiencyUpdateInputSchema,ProficiencyUncheckedUpdateInputSchema ]),
  where: ProficiencyWhereUniqueInputSchema,
}).strict() ;

export const ProficiencyUpdateManyArgsSchema: z.ZodType<Prisma.ProficiencyUpdateManyArgs> = z.object({
  data: z.union([ ProficiencyUpdateManyMutationInputSchema,ProficiencyUncheckedUpdateManyInputSchema ]),
  where: ProficiencyWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProficiencyDeleteManyArgsSchema: z.ZodType<Prisma.ProficiencyDeleteManyArgs> = z.object({
  where: ProficiencyWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;