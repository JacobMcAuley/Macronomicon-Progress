// General
enum BlockNames {
    Base = 'macro_base',
    Chat = 'chat_message',
}

// Language/Flow
enum BlockNames {
    CollectionForEach = 'collection_for_each',
}

// Token
enum BlockNames {
    // Find
    SelectedTokens = 'token_query_selected_tokens',
    SceneTokens = 'token_query_scene_tokens',

    // Filter
    FilterPCs = 'filter_pc_actors',
    FilterNPCs = 'filter_npc_actors',
    FilterPCsNamed = 'filter_pcs_named',
    FilterNPCsNamed = 'filter_npcs_named',
    FilterFriendly = 'filter_friendly',
    FilterHostile = 'filter_hostile',

    // Update
    ApplyDamage = 'apply_damage',
    ApplyHealing = 'apply_healing',
}

enum BlockTypes {
    // Specific
    ActorCollection = 'ActorCollection', // Can be resolved back to an actor
    ActorCollectionFilter = 'ActorCollectionFilter',
    ActorUpdate = 'ActorUpdate',

    // Meta
    Collection = 'Collection',
}

export { BlockNames, BlockTypes };
