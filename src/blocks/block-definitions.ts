// Token
enum BlockNames {
    Base = 'macro_base',

    ForEach = 'for_each',

    EntityContext = 'entity_context',
    EntityContextItem = 'entity_context_item',

    InputRoll = 'input_roll',

    ItemsOnToken = 'items_on_token',
    ItemsFilterNamed = 'items_filter_named',

    RollItemCard = 'roll_item_card',

    TokensFilterAnd = 'tokens_filter_and',
    TokensFilterOr = 'tokens_filter_or',
    TokensFilterFriendly = 'tokens_filter_friendly',
    TokensFilterHostile = 'tokens_filter_hostile',
    TokensFilterNPC = 'tokens_filter_npc',
    TokensFilterNamed = 'tokens_filter_named',
    TokensFilterActorNamed = 'tokens_filter_actor_named',
    TokensFilterPlayer = 'tokens_filter_player',
    TokensFilterSelected = 'tokens_filter_selected',
    TokensFindScene = 'tokens_find_scene',
    TokensSelectorAll = 'tokens_selector_all',
    TokensSelectorFirst = 'tokens_selector_first',

    TokenRetrieveAC = 'token_retrieve_ac',
    TokenRetrieveLevel = 'token_retrieve_level',
    TokenRetrieveHealth = 'token_retrieve_health',
    TokenRetrieveResource = 'token_retrieve_resource',

    TokenUpdateHealth = 'token_update_health',
    TokenUpdateDamage = 'token_update_damage',

    UserInputNumber = 'user_input_number',
}

enum BlockTypes {
    Actor = 'Actor',
    ActorCollection = 'ActorCollection',

    Item = 'Item',
    ItemCollection = 'ItemCollection',
    ItemCollectionFilter = 'ItemCollectionFilter',

    Token = 'Token',
    TokenCollection = 'TokenCollection',
    TokenCollectionFilter = 'TokenCollectionFilter',

    Number = 'Number',
    String = 'String',
}

enum BlockColours {
    Default = '#555555',
    Green1 = '#8cb369',
    Green2 = '#5b8e7d',
    Orange = '#f4a259',
    Red = '#bc4b51',
    Yellow = '#f4e285',
    Purple = '#8d59f4',
}

export type BlockCollections = Extract<BlockTypes, `${string}Collection`>;

const BlockTypeColourMap: Record<BlockTypes, BlockColours> = {
    [BlockTypes.Actor]: BlockColours.Green1,
    [BlockTypes.ActorCollection]: BlockColours.Green1,
    [BlockTypes.Token]: BlockColours.Green2,
    [BlockTypes.TokenCollection]: BlockColours.Green2,
    [BlockTypes.TokenCollectionFilter]: BlockColours.Green2,
    [BlockTypes.Item]: BlockColours.Orange,
    [BlockTypes.ItemCollection]: BlockColours.Orange,
    [BlockTypes.ItemCollectionFilter]: BlockColours.Orange,
    [BlockTypes.Number]: BlockColours.Red,
    [BlockTypes.String]: BlockColours.Yellow,
};

export const BlockCollectionItemMap: Map<BlockCollections, BlockTypes> = new Map([
    [BlockTypes.ActorCollection, BlockTypes.Actor],
    [BlockTypes.ItemCollection, BlockTypes.Item],
    [BlockTypes.TokenCollection, BlockTypes.Token],
]);

export { BlockTypeColourMap, BlockNames, BlockTypes, BlockColours };
