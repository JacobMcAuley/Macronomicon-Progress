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
    RollChat = 'roll_chat',
    RollAbilities = 'roll_abilities_chat',

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
    RetrieveRollTotal = 'retrieve_roll_total',

    // Rolls
    UseWeapon = 'use_weapon',
    UseSpell = 'use_spell',
    RollDice = 'roll_dice',
    RollFormula = 'roll_formula',
    ReturnRoll = 'return_roll',
    RollPredefined = 'roll_predefined',
    RollCustom = 'roll_custom',

    //Roll Mutator
    ListRollCreate = 'list_roll_create_with',

    //Token Vision
    UpdateTokenSightLight = 'update_token_sight_light',
    UpdateTokenSightAngle = 'update_token_sight_angle',
    UpdateTokenLightColor = 'update_token_light_color',

    //Light Placeables
    UpdateLight = 'update_light',
    UpdateLightAnimation = 'update_light_animation',
    UpdateLightColor = 'update_light_color',
    UpdateLightFOV = 'update_light_fov',
    UpdateLightRotation = 'update_light_rotation',

    UpdateDarkness = 'update_darkness',
    SceneLights = 'light_query_all',

    //Generic
    UserNumber = 'user_number',

    // Meta
    TestBlock = 'test_block',
    TestBlock2 = 'test_block_2',
}

enum BlockTypes {
    // Specific
    ActorCollection = 'ActorCollection', // Can be resolved back to an actor
    ActorCollectionFilter = 'ActorCollectionFilter',
    ActorUpdate = 'ActorUpdate',

    // Light
    LightUpdate = 'LightUpdate',

    // Rolls
    RollInfo = 'RollInfo',
    RollCollection = 'RollCollection',

    //Information
    EntityInfo = 'EntityInfo',

    // Meta
    Collection = 'Collection',
    Control = 'Control',

    // Language
    Number = 'Number',
}

export { BlockNames, BlockTypes };
