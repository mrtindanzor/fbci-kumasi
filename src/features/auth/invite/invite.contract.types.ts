export abstract class IInviteService {
  abstract generateLink(originUrl: string): Promise<string>
}
