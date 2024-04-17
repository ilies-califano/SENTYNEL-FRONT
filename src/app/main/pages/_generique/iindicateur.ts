// Créer l'interface Indicateur
export interface IIndicateur {
    // Définir le titre
    titre: string,

    // Définir le nom de la série
    serieNom: string,

    // Définir les données de la série
    serieDonnees: any[],

    // Définir les Abscisses
    abscisses: any[]
}
