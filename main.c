//
//  main.c
//  git.portfolio
//
//  Created by Otto on 16.11.2024.
//
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

#define TILINRO "12345"
#define PIN_KOODI "0077"
#define ALKU_SALDO 10000

void paa(float *saldo, const char *tilinro);
void jatka(void) {
    while (getchar() != '\n');
}

void paattyy(void) {
    printf("Kiitos kaynnista, tervetuloa uudelleen.\n");
    exit(0);
}

void alku(void) {
    char tilinro[256];
    FILE *tiliTiedosto;
    char oikeaPin[256];
    float saldo = ALKU_SALDO;
    char pin[256];
    
    printf("\nTervetuloa!\nPaina enter edetaksesi\nSyötä kortti, ole hyva -> ");
    jatka();
    printf("Syotä tilinumero: ");
    fgets(tilinro, sizeof(tilinro), stdin);
    tilinro[strcspn(tilinro, "\n")] = 0;

    strcat(tilinro, ".tili");

    if (strcmp(tilinro, TILINRO ".tili") == 0) {
        printf("Tili %s valittu.\n", TILINRO);
    } else {
        tiliTiedosto = fopen(tilinro, "r");
        if (tiliTiedosto == NULL) {
            printf("Tilinumeroa vastaavaa tiliä ei loytynyt.\n");
            return;
        }
        fgets(oikeaPin, sizeof(oikeaPin), tiliTiedosto);
        oikeaPin[strcspn(oikeaPin, "\n")] = 0;
        fscanf(tiliTiedosto, "%f", &saldo);
        fclose(tiliTiedosto);
    }

    printf("Syota nelinumeroinen PIN-koodi: ");
    fgets(pin, sizeof(pin), stdin);
    pin[strcspn(pin, "\n")] = 0;

    if (strcmp(pin, oikeaPin) == 0) {
        printf("PIN-koodi oikein.\n");
        printf("Tilin saldo: %.2f€\n", saldo);
        paa(&saldo, tilinro);
    } else {
        printf("Virheellinen PIN-koodi.\n");
    }
}

void tapahtumat(float maara) {
    FILE *tapahtuma = fopen("tapahtumat.maara", "a");
    if (tapahtuma != NULL) {
        fprintf(tapahtuma, "Nostettu: %.2f€\n", maara);
        fclose(tapahtuma);
    } else {
        printf("Ei tapahtumia\n");
    }
}

void nayta_tapahtumat(void) {
    FILE *tapahtuma = fopen("tapahtumat.maara", "r");
    if (tapahtuma == NULL) {
        printf("Ei tapahtumia\n");
        return;
    }

    char line[256];
    printf("\nTapahtumat:\n");
    while (fgets(line, sizeof(line), tapahtuma)) {
        printf("%s", line);
    }
    fclose(tapahtuma);
}

void nosto(float *saldo) {
    int maara;
    printf("Syota haluamasi nostosumma: ");
    if (scanf("%d", &maara) != 1 || maara < 50 || maara > 1000) {
        printf("Virheellinen syote, summa tulee olla valillä 50-1000€.\n");
        jatka();
        return;
    }

    if (maara > *saldo) {
        printf("Ei riittävasti saldoa.\n");
        jatka();
        return;
    }

    int n50 = maara / 50;
    int yli = maara % 50;
    int n20 = 0;
    
    if (yli % 20 == 0) {
        n20 = yli / 20;
        printf("Saat %d kpl 50 euron setelia ja %d kpl 20 euron setelia\n", n50, n20);
        *saldo -= maara;
        tapahtumat(maara);
    } else {
        printf("20 euron ja 50 euron setelit vain mahdollisia.\n");
    }
}

void paa(float *saldo, const char *tilinro) {
    int num;
    FILE *tiliTiedosto;
    while (1) {
        printf("\nValitse;\nSaldo(1),\nOtto(2),\nTapahtumat(3),\nLataus(4),\nLopeta(5): ");
        if (scanf("%d", &num) != 1) {
            printf("Virheellinen syote. Yrita uudelleen.\n");
            jatka();
            continue;
        }

        float sum;
        switch (num) {
            case 1:
                printf("\nTilin tilanne\nSaldo: %.2f€\n", *saldo);
                jatka();
                break;
            case 2:
                printf("\nOtto\n");
                nosto(saldo);
                jatka();
                break;
            case 3:
                printf("\nTapahtumat\n");
                nayta_tapahtumat();
                jatka();
                break;
            case 4:
                printf("\nLiittymän lataus\n");
                jatka();
                printf("Valitse palvelu:\nSaunalahti(1)\ndna(2)\nGo Mobile(3)\nAlkuun(4)\n:");
                if (scanf("%d", &num) != 1) {
                    printf("Virheellinen syote. Yrita uudelleen.\n");
                    jatka();
                    continue;
                }
                jatka();

                if (num == 1 || num == 2 || num == 3) {
                    int num1;
                    printf("Syota puhelinnumero +358: ");
                    if (scanf("%d", &num1) != 1) {
                        printf("Virheellinen syote. Yrita uudelleen.\n");
                        jatka();
                        continue;
                    }
                    jatka();

                    printf("Valitse latauksen summa: ");
                    if (scanf("%f", &sum) != 1) {
                        printf("Virheellinen syote. Yrita uudelleen.\n");
                        jatka();
                        continue;
                    }

                    if (sum > *saldo) {
                        printf("Ei riittavasti saldoa.\n");
                        jatka();
                        continue;
                    }

                    *saldo -= sum;
                    tapahtumat(sum);
                    printf("Hyvaksy %.2f€ maksu\nLatausnumeroon +358%d\n", sum, num1);
                    jatka();
                } else if (num == 4) {
                    break;
                } else {
                    printf("Virheellinen syote. Yrita uudelleen.\n");
                    jatka();
                    continue;
                }
                break;
            case 5:
                printf("Lopetetaan ohjelma...\n");
                tiliTiedosto = fopen(tilinro, "w");
                if (tiliTiedosto != NULL) {
                    fprintf(tiliTiedosto, "%s\n%.2f\n", PIN_KOODI, *saldo);
                    fclose(tiliTiedosto);
                } else {
                    printf("Virhe tiedoston avauksessa.\n");
                }
                paattyy();
                return;
            default:
                printf("Virheellinen valinta. Yrita uudelleen.\n");
                jatka();
                continue;
        }
    }
}

int main(void) {
    alku();
    return 0;
}
