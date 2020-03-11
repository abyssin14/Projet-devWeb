<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\InviteRepository")
 */
class Invite
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $presence;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $allergie;

    /**
     * @ORM\Column(type="boolean")
     */
    private $accompagnant;

    /**
     * @ORM\Column(type="integer")
     */
    private $enfant;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPresence(): ?string
    {
        return $this->presence;
    }

    public function setPresence(string $presence): self
    {
        $this->presence = $presence;

        return $this;
    }

    public function getAllergie(): ?string
    {
        return $this->allergie;
    }

    public function setAllergie(?string $allergie): self
    {
        $this->allergie = $allergie;

        return $this;
    }

    public function getAccompagnant(): ?bool
    {
        return $this->accompagnant;
    }

    public function setAccompagnant(bool $accompagnant): self
    {
        $this->accompagnant = $accompagnant;

        return $this;
    }

    public function getEnfant(): ?int
    {
        return $this->enfant;
    }

    public function setEnfant(int $enfant): self
    {
        $this->enfant = $enfant;

        return $this;
    }
}
