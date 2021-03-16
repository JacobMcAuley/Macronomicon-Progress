// General
enum BlockNames {
    Base = 'macro_base',
    Chat = 'chat_message',
}

// Language/Flow
enum BlockNames {
    //Collection
    CollectionForEach = 'collection_for_each',

    //Control
    ControlIfStatement = 'control_if_statement',
}

// Token
enum BlockNames {
    //Chat
    ChatAloud = 'chat_aloud',

    // Find
    SelectedTokens = 'token_query_selected_tokens',
    SceneTokens = 'token_query_scene_tokens',

    // Filter
    FilterPCs = 'filter_pc',
    FilterNPCs = 'filter_npc',
    FilterPCsNamed = 'filter_pcs_named',
    FilterNPCsNamed = 'filter_npcs_named',
    FilterFriendly = 'filter_friendly',
    FilterHostile = 'filter_hostile',

    // Update
    ApplyDamage = 'apply_damage',
    ApplyHealing = 'apply_healing',
    ToggleEffect = 'toggle_effect',
    ToggleVisibility = 'toggle_visibility',

    //Information
    RetrieveHP = 'retrieve_hp',
    RetrieveAttribute = 'retrieve_attribute',

    // Rolls
    UseWeapon = 'use_weapon',
    UseSpell = 'use_spell',
    RollChat = 'roll_chat',
    RollFormula = 'roll_formula', // TODO
    ReturnRoll = 'return_roll',
    RollPredefined = 'roll_predefined',
    RollCustom = 'roll_custom',
    RollAbilities = 'roll_abilities',

    //Generic
    UserNumber = 'user_number',

    // Meta
    TestBlock = 'test_block',
}

enum BlockTypes {
    // Specific
    ActorCollection = 'ActorCollection', // Can be resolved back to an actor
    ActorCollectionFilter = 'ActorCollectionFilter',
    ActorUpdate = 'ActorUpdate',

    // Rolls
    RollInfo = 'RollInfo',

    //Information
    EntityInfo = 'EntityInfo',

    // Meta
    Collection = 'Collection',
    Control = 'Control',

    // Language
    Number = 'Number',
}

export { BlockNames, BlockTypes };
