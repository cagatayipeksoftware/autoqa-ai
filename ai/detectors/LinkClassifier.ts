import { NavigationLink } from "../models/NavigationLink";

export class LinkClassifier {

    private readonly productKeywords = [
        "product",
        "item",
        "detail",
        "prod"
    ];

    private readonly cartKeywords = [
        "cart",
        "basket",
        "shopping cart",
        "sepet"
    ];

    private readonly loginKeywords = [
        "login",
        "log in",
        "signin",
        "sign in",
        "giriş",
        "giriş yap"
    ];

    isCart(link: NavigationLink): boolean {

        const text = link.text.toLowerCase();

        const href = link.href.toLowerCase();

        return this.cartKeywords.some(keyword =>
            text.includes(keyword) ||
            href.includes(keyword)
        );

    }

    isLogin(link: NavigationLink): boolean {

        const text = link.text.toLowerCase();

        return this.loginKeywords.some(keyword =>
            text.includes(keyword)
        );

    }

    isProduct(link: NavigationLink): boolean {

        const href = link.href.toLowerCase();

        return this.productKeywords.some(keyword =>
            href.includes(keyword)
        );

    }

}